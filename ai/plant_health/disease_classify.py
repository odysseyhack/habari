import os
import argparse
import subprocess
import numpy as np
from PIL import Image
from tensorflow.python.keras.models import load_model
from tensorflow.python.keras.preprocessing import image
from tensorflow.python.keras.applications.inception_v3 import preprocess_input
SPECIES = ['apple', 'bean', 'blueberry', 'cherry', 'corn', 'grape', 'grapefruit', 'orange', 'peach','pepper', 'potato', 'raspberry', 'sorghum', 'soybean', 'squash', 'strawberry', 'sugarcane', 'tomato']
DISEASE_SUPPORTED_SPECIES = {'apple', 'cherry', 'corn', 'grape', 'peach', 'pepper', 'potato', 'strawberry', 'sugarcane', 'tomato', }
APPLE_CLASSES = ['Apple___Apple_scab', 'Apple___Black_rot', 'Apple___Cedar_apple_rust', 'Apple___healthy']
CHERRY_CLASSES = ['Cherry_(including_sour)___Powdery_mildew', 'Cherry_(including_sour)___healthy']
CORN_CLASSES = ['Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot', 'Corn_(maize)___Common_rust_','Corn_(maize)___Northern_Leaf_Blight', 'Corn_(maize)___healthy']
GRAPE_CLASSES = ['Grape___Black_rot', 'Grape___Esca_(Black_Measles)', 'Grape___Leaf_blight_(Isariopsis_Leaf_Spot)','Grape___healthy']
PEACH_CLASSES = ['Peach___Bacterial_spot', 'Peach___healthy']
PEPPER_CLASSES = ['Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy']
POTATO_CLASSES = ['Potato___Early_blight', 'Potato___Late_blight', 'Potato___healthy']
STRAWBERRY_CLASSES = ['Strawberry___Leaf_scorch', 'Strawberry___healthy']
SUGARCANE_CLASSES = ['Sugarcane leaf spot', 'Sugarcane aphid', 'Sugarcane coal fouling']
TOMATO_CLASSES = ['Tomato___Bacterial_spot', 'Tomato___Early_blight', 'Tomato___Late_blight', 'Tomato___Leaf_Mold','Tomato___Septoria_leaf_spot', 'Tomato___Spider_mites Two-spotted_spider_mite','Tomato___Target_Spot', 'Tomato___Tomato_Yellow_Leaf_Curl_Virus', 'Tomato___Tomato_mosaic_virus','Tomato___healthy']
PLANT_CLASSES = {'apple': APPLE_CLASSES,'cherry': CHERRY_CLASSES,'corn': CORN_CLASSES,'grape': GRAPE_CLASSES,'peach': PEACH_CLASSES,'pepper': PEPPER_CLASSES,'potato': POTATO_CLASSES,'strawberry': STRAWBERRY_CLASSES,'sugarcane': SUGARCANE_CLASSES,'tomato': TOMATO_CLASSES,}
VGG_ARCHITECTURE = 'vgg'
INCEPTIONV3_ARCHITECTURE = 'inceptionv3'
SUPPORTED_MODEL_TYPES = {VGG_ARCHITECTURE, INCEPTIONV3_ARCHITECTURE}
DISEASE_DETECTION = 'disease_detection'
SPECIES_DETECTION = 'species_detection'
TARGET_IMAGE_SIZES = {VGG_ARCHITECTURE: {DISEASE_DETECTION: (64, 64),SPECIES_DETECTION: (100, 100),},INCEPTIONV3_ARCHITECTURE: {DISEASE_DETECTION: (100, 100),SPECIES_DETECTION: (100, 100),}}
VGG_MODELS = {'apple': 'Apple_0.9395_VGG.h5','cherry': 'Cherry_0.9873_VGG.h5','corn': 'Corn_0.8926_VGG.h5','grape': 'Grape_0.9293_VGG.h5','peach': 'Peach_97_VGG.h5','tomato': 'Tomato_0.8675_VGG.h5','pepper': 'pepper_95.90.h5','potato': 'potato_90.62.h5','strawberry': 'starwberry_99.h5','sugarcane': 'Sugarcane_0.8356_VGG.h5'}
INCEPTIONV3_MODELS = {'apple': 'InceptionV3-scratch_segApple.h5','cherry': 'InceptionV3-scratch_segCherry.h5','corn': 'InceptionV3-scratch_segCorn.h5','grape': 'InceptionV3-scratch_segGrape.h5','peach': 'InceptionV3-scratch_segPeach.h5','tomato': 'InceptionV3-scratch_segTomato.h5','pepper': 'InceptionV3-scratch_segPepper.h5','potato': 'InceptionV3-scratch_segPotato.h5','strawberry': 'InceptionV3-scratch_segStrawberry.h5','sugarcane': 'InceptionV3-scratch_segSugarcane.h5'}
MODEL_STORAGE_BASE = 'Plant_Disease_Detection_Benchmark_models/Models'


def get_classes(species_name):
    return PLANT_CLASSES[species_name]


def get_disease_model(species, model_type):
    if species not in DISEASE_SUPPORTED_SPECIES:
        raise ValueError("`{}` species has no disease model yet.\n""Species tha have disease models are {}".format(species, DISEASE_SUPPORTED_SPECIES))
    if model_type == VGG_ARCHITECTURE:
        return VGG_MODELS[species]
    elif model_type == INCEPTIONV3_ARCHITECTURE:
        return INCEPTIONV3_MODELS[species]
    else:
        raise ValueError("No such `{}` model type is supported.\n"
                         "Supported model types are {}".format(model_type, SUPPORTED_MODEL_TYPES))


def get_species_model(model_type):
    if model_type == VGG_ARCHITECTURE:
        return 'VGG_all_100p_94.h5'
    elif model_type == INCEPTIONV3_ARCHITECTURE:
        return 'InceptionV3-scratch_segspecies.h5'
    else:
        raise ValueError("No such `{}` model type is supported.\n"
                         "Supported model types are {}".format(model_type, SUPPORTED_MODEL_TYPES))


def get_predictions(model_path, img_path, img_target_size):
    if not os.path.exists(model_path):
        raise ValueError('No such `{}` file found\n'
                         'Please, checkout the readme of the project '
                         'on github and download required models'.format(model_path))
    model = load_model(model_path)
    pil_img = Image.open(img_path)
    if pil_img.size != img_target_size:
        pil_img = pil_img.resize(img_target_size)

    img = image.img_to_array(pil_img)
    if img.shape[2] == 4:
        img = img[:, :, :3]
    img = np.expand_dims(img, axis=0)
    img = preprocess_input(img)
    preds = model.predict(img).flatten()
    value_ = preds.argsort()
    sorted_preds_index = value_[::-1]
    return preds, sorted_preds_index


def segment_image(img_path):
    image_name, extension = os.path.splitext(img_path)
    segmented_image_name = image_name + "_marked" + extension  # the future segmented image name to be
    result = subprocess.check_output(['python', "leaf-image-segmentation/segment.py", "-s", img_path])
    print('Info: Input image segmented.')

    return segmented_image_name


def segment_and_predict_species(img_path, model_type=VGG_ARCHITECTURE, do_print=True):
    segmented_image_name = segment_image(img_path)
    model_path = os.path.join(MODEL_STORAGE_BASE, get_species_model(model_type))
    target_image_size = TARGET_IMAGE_SIZES[model_type][SPECIES_DETECTION]
    preds, sorted_preds_index = get_predictions(model_path, segmented_image_name, target_image_size)
    if do_print:
        print("Plant Species :")
        for i in sorted_preds_index:
            print("\t - " + str(SPECIES[i]) + ": \t" + str(preds[i]))
    return str(SPECIES[sorted_preds_index[0]]), segmented_image_name


def predict_species(img_path, model_type=VGG_ARCHITECTURE, do_print=True):
    model_path = os.path.join(MODEL_STORAGE_BASE, get_species_model(model_type))
    target_image_size = TARGET_IMAGE_SIZES[model_type][SPECIES_DETECTION]
    preds, sorted_preds_index = get_predictions(model_path, img_path, target_image_size)
    if do_print:
        print("Plant Species :")
        for i in sorted_preds_index:
            print("\t - " + str(SPECIES[i]) + ": \t" + str(preds[i]))
    return str(SPECIES[sorted_preds_index[0]])


def predict_disease(img_path, species, model_type=VGG_ARCHITECTURE, do_print=True):
    if species not in SPECIES:
        raise ValueError("No such `{}` species is supported.\n"
                         "Supported species are {}".format(species, SPECIES))
    if species not in DISEASE_SUPPORTED_SPECIES:
        print("Info: For `{}` species, a disease can not be predicted "
              "since its disease model is not implemented yet.".format(species))
        return None
    else:
        SPECIES_CLASSES = get_classes(species)
        model_path = os.path.join(MODEL_STORAGE_BASE, get_disease_model(species, model_type))
        target_image_size = TARGET_IMAGE_SIZES[model_type][DISEASE_DETECTION]
        preds, sorted_preds_index = get_predictions(model_path, img_path, target_image_size)
        if do_print:
            print("Plant Disease : ")
            for i in sorted_preds_index:
                print("\t-" + str(SPECIES_CLASSES[i]) + ": \t" + str(preds[i]))
        print("sorted_preds_index", sorted_preds_index)
        print("return obj", str(SPECIES_CLASSES[sorted_preds_index[0]]))

        return str(SPECIES_CLASSES[sorted_preds_index[0]])


def get_cmd_args():
    parser = argparse.ArgumentParser()
    parser.add_argument("image", type=str, help='Image file path')
    parser.add_argument('--model', type=str.lower, default=VGG_ARCHITECTURE,
                        choices=[VGG_ARCHITECTURE, INCEPTIONV3_ARCHITECTURE],
                        help='Type of model to user for prediction')
    parser.add_argument("--segment", action='store_true', help='Perform segmentation before prediction')
    parser.add_argument("--species", type=str.lower, default='', help='Species Name if known')
    args = parser.parse_args()
    return args


def run_file(file_path):
    print("filepath: " + file_path)
    args = {}
    args['image'] = file_path
    args['model'] = 'inceptionv3'
    args['segment'] = False
    args['species'] = 'apple'
    plant_classification = {}
    if args['segment'] == False and args['species'] == '':
        plant_classification['species'] = predict_species(args['image'], args['model'])
        plant_classification['disease']= predict_disease(args['image'],\
            plant_classification['species'], args['model'])
    elif args['segment'] == False and args['species'] != '':
        plant_classification['disease']=predict_disease(args['image'], args['species'], args['model'])
    elif args['segment'] == True and args['species'] == '':
        plant_classification['species'], image_name = segment_and_predict_species(args['image'], args['model'])
        plant_classification['disease']=predict_disease(image_name, plant_classification['species'])
    elif args['segment'] == True and args['species'] != '':
        plant_classification['species'], image_name = segment_image(args['image'])
        plant_classification['disease'] = predict_disease(image_name, args['species'], args['model'])
    else:
        print("Make Sure Your Command is Correct")
    print("plant_classification" + str(plant_classification))
    return plant_classification

