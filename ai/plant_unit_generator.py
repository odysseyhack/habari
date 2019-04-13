from __future__ import absolute_import
from __future__ import division
from __future__ import print_function
import os
import numpy as np
import pandas as pd
import seaborn as sns
from sklearn import pipeline
from sklearn.preprocessing import StandardScaler, MinMaxScaler, normalize
from sklearn.feature_selection import VarianceThreshold
from tqdm import tqdm
from keras.models import Sequential
from keras.layers import Dense, LSTM, GRU, Activation, Masking, BatchNormalization, Lambda
import keras.backend as K
from keras import callbacks
import keras
from keras.layers.wrappers import TimeDistributed
from keras.optimizers import RMSprop,adam
from keras.callbacks import History
from six.moves import xrange
import matplotlib.pyplot as plt
import math
import wtte.weibull as weibull
import wtte.wtte as wtte
from wtte.wtte import WeightWatcher
import utils as ut
import weibull_functions as wbf
event_obj = ut.EventMap(10.0)

def split_time_intervals(total_interval, eventless_interval, num_events):
'''
Transform plant unit number to different indices, based on number of damage events in sequence. Then feed this array into the original build damage function.

Use test_y_vec to provide the training data. Validation now becomes impossible on the training data, but can be done with real plant data.
'''
    total_interval = int(total_interval)
    eventless_interval = int(eventless_interval)
    num_events = int(num_events)
    # Splits total interval in an event-free period, and damage intervals
    interval_dict = {
        'eventless_interval': 0,
        'damage_intervals': []
        }
    cumulative_damage_intervals = total_interval - eventless_interval
    num_events = min(num_events, cumulative_damage_intervals)
    if num_events > 0:
        damage_interval = int(cumulative_damage_intervals / num_events)
    else:
        damage_interval = 0
    for i in range(num_events):
        interval_dict['damage_intervals'].append(damage_interval)
    # Calc residual length to correct for rounding errors
    eventless_interval = total_interval - damage_interval*num_events
    interval_dict['eventless_interval'] = eventless_interval
    # Check for rounding errors
    if len(interval_dict['damage_intervals']) != num_events:
        print("Warning: Number of damage intervals %d does not match number of events %d. Check rounding." %(len(interval_dict['damage_intervals']), num_events))
    # Final check: make sure interval lengths sum up to total duration
    if ut.sum_dict_keys_and_lists(interval_dict) != total_interval:
        print("Warning: Interval lengths don't sum up to total!", ut.sum_dict_keys_and_lists(interval_dict), total_interval)
    return interval_dict

def generate_units_on_new_intervals(plant, y, damage_unit):
    # Argument 0: vector/list of plant/time indices, zero-based
    # Argument 1: test_y data in (hour of measurement, percentage damage recorded)
    # Arg 2: % damage that counts as one unit. Used for discretisation of damage events.
    # Returns: Plant vector with rescaled indices, one for each damage interval

    # For now, it assumes each plant is identical, insensitive to its history and starts off in the same state
    plant_orig = plant
    y_orig = y
    new_plant_indices = []
    event_indicator = []
    time_vec = []
    abs_idx = -1
    plant_idx = 0
    for idx, row in y_orig.iterrows():
        duration = row['idx'] # moment when damage is discovered
        damage = row['T'] # percentage damage

        # Find num of timesteps for this plant index
        num_times =  np.count_nonzero(np.array(plant_orig) == idx)
        damage_free_duration = num_times - duration
        num_damage_events = event_obj.map_percentage_to_events(damage)
        # Interval dictionary with 'eventless_interval' and 'eventless_interval' key
        intervals = split_time_intervals(num_times, damage_free_duration, num_damage_events)
        # Redefine indices in plant and y data
        for interval in intervals['damage_intervals']:
            abs_idx += 1
            t = -1
            for i in range(interval):
                t += 1
                time_vec.append(t)
                new_plant_indices.append(abs_idx)
                event_indicator.append(1)
        abs_idx += 1
        t = -1
        for item in range(intervals['eventless_interval']):
            t += 1
            time_vec.append(t)
            new_plant_indices.append(abs_idx)
            event_indicator.append(0)

    new_plant_indices = new_plant_indices[0:len(plant)]
    event_indicator = event_indicator[0:len(plant)]
    time_vec = time_vec[0:len(plant)]

    return new_plant_indices, event_indicator, time_vec


def build_data(plant, time, x, max_time, is_test, mask_value):
    # y[0] will be days remaining, y[1] will be event indicator, always 1 for this data unless no event takes place at all
    out_y = []

    # number of features
    d = x.shape[1]

    # A full history of sensor readings to date for each x
    out_x = []
    n_plants= int(np.amax(plant)) + 1

    for i in tqdm(range(n_plants)):
        # When did the plant fail? (Last day + 1 for train data, irrelevant for test.)
        if len(time[plant==i]) != 0:
            max_plant_time = int(np.max(time[plant == i])) + 1

            this_x = []

            for j in range(max_plant_time):
                plant_x = x[plant == i]
                # print("i", i , x.shape, x[plant == i].shape)
                out_y.append(np.array((max_plant_time - j, 1), ndmin=2))

                xtemp = np.zeros((1, max_time, d))
                xtemp += mask_value
                xtemp[:, max_time-min(j, max_time-1)-1:max_time, :] = plant_x[max(0, j-max_time+1):j+1, :]
                this_x.append(xtemp)

            this_x = np.concatenate(this_x)
            out_x.append(this_x)
    out_x = np.concatenate(out_x)
    out_y = np.concatenate(out_y)
    return out_x, out_y


# if __name__ == "__main__":
#     print("Damage function test\n")

# Read in sample data to try out build_data()

id_col = 'unit_number'
time_col = 'time'
feature_cols = [ 'shelter_setting_1', 'shelter_setting_2', 'shelter_setting_3'] + ['environment_measurement_{}'.format(x) for x in range(0,21)]
column_names = [id_col, time_col] + feature_cols

train_orig = pd.read_csv('/Users/Quincy/Documents/Code/hackathons/habari/MIMEA_ewold/AI_survival/WTTE_approach/data/train.csv',  names=column_names)
test_x_orig = pd.read_csv('/Users/Quincy/Documents/Code/hackathons/habari/MIMEA_ewold/AI_survival/WTTE_approach//data/test_x.csv', names=column_names)
test_y_orig = pd.read_csv('/Users/Quincy/Documents/Code/hackathons/habari/MIMEA_ewold/AI_survival/WTTE_approach//data/test_y_vec.csv', names=['idx','T'])

train_orig.set_index(['unit_number', 'time'], verify_integrity=True)

all_data_orig = train_orig

scaler=pipeline.Pipeline(steps=[
#     ('z-scale', StandardScaler()),
     ('minmax', MinMaxScaler(feature_range=(-1, 1))),
     ('remove_constant', VarianceThreshold())
])

all_data = all_data_orig.copy()
all_data = np.concatenate([all_data[['unit_number', 'time']], scaler.fit_transform(all_data[feature_cols])], axis=1)
train = all_data[0:train_orig.shape[0], :]
test = all_data[train_orig.shape[0]:, :]
# Make plant numbers and days zero-indexed
train[:, 0:2] -= 1
test[:, 0:2] -= 1

# # Configurable observation look-back period for each plant/day
max_time = 20
mask_value = -99

# (unit numbers, cumulative time vector, sensor data, max time, test boolean, mask values)
train_x, train_y = build_data(plant=train[:, 0], time=train[:, 1], x=train[:, 2:], max_time=max_time, is_test=False, mask_value=mask_value)
# Relabel indices
new_int, new_y, new_time = generate_units_on_new_intervals(train[:, 0], test_y_orig, 10.0)

new_train = train_orig
new_train['unit_number'] = new_int
new_train['time'] = new_time
new_train = np.concatenate([new_train[['unit_number', 'time']], scaler.fit_transform(new_train[feature_cols])], axis=1)
train_x, train_y = build_data(plant=new_train[:, 0], time=new_train[:, 1], x=new_train[:, 2:], max_time=max_time, is_test=False, mask_value=mask_value)

tte_mean_train = np.nanmean(train_y[:,0])
mean_u = np.nanmean(train_y[:,1])

# Initialization value for alpha-bias
init_alpha = -1.0/np.log(1.0-1.0/(tte_mean_train+1.0) )
init_alpha = init_alpha/mean_u
print('tte_mean_train', tte_mean_train, 'init_alpha: ',init_alpha,'mean uncensored train: ',mean_u)

K.set_epsilon(1e-10)
history = History()
weightwatcher = WeightWatcher()
nanterminator = callbacks.TerminateOnNaN()
n_features = train_x.shape[-1]

# Build Keras model
model = Sequential()
model.add(Masking(mask_value=mask_value, input_shape=(None, n_features)))
model.add(GRU(20, activation='tanh', recurrent_dropout=0.25))
model.add(Dense(2))
model.add(Lambda(wtte.output_lambda,
                 arguments={"init_alpha":init_alpha,
                            "max_beta_value":100.0,
                            "alpha_kernel_scalefactor":0.5
                           },
                ))
loss = wtte.loss(kind='discrete',reduce_loss=False).loss_function
model.compile(loss=loss, optimizer=adam(lr=.01, clipvalue=0.5))

# Train model
model.fit(train_x, train_y,
          epochs=25,
          batch_size=20,
          verbose=1,
          validation_split=0.1,
          callbacks=[nanterminator,history,weightwatcher])

## Assess fit quality
# plt.plot(history.history['loss'],    label='training')
# plt.plot(history.history['val_loss'],label='validation')
# plt.title('loss')
# plt.legend()

# weightwatcher.plot()

# Generate test data artificially in the format matching training data. The sensory inputs such as temperature, humidity, etc should go here.
# test_x has dimensions (num_plants, n_time_samples, n_sensory_features)
test_sample_time = 30
num_parameters = train_x.shape[2]

print("Generating test data for time length %d and number of parameters: %d" %(test_sample_time, num_parameters))
test_x = np.ndarray((1,test_sample_time, num_parameters))

for i in range(test_sample_time):
    for j in range(num_parameters):
        test_x[0,:,:] = [[i] + (np.random.rand(1, num_parameters)-0.5)*2.0 ]

# Calculate estimation (prediction)
mod_prediction = model.predict(test_x)
mod_prediction_df = pd.DataFrame(mod_prediction, columns=['alpha', 'beta'])

# Calculate expectationvalue of model prediction
alpha = mod_prediction_df['alpha'].mean()
beta = mod_prediction_df['beta'].mean()
median = wbf.weibull_median(alpha, beta)
print("Expect to see one degradation event every %2.0f time units." %(median))
total_num_damage_event = test_x.shape[1]/median
print("In your time interval, %d damage events are expected to take place. This would result in %2.0f %% crop damage." %(total_num_damage_event, event_obj.map_events_to_damage_perc(total_num_damage_event)))

# sns.jointplot(data=train_results_df, y='T', x='predicted_median',kind="kde" )
