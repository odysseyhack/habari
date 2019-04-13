from PIL import Image, ImageFilter, ImageDraw
from sklearn.cluster import KMeans
from skimage import measure, util
import numpy as np, math, random

import os
PLANT_IMAGE_FOLDER = "./plant_images"
TEMP_IMAGE_FOLDER = "./template_images"
IMAGE_SUFFIX = ".jpg"
LAPLACIAN_KERNEL = [0,-1,0,-1,8,-1,0,-1,0]
THRESHOLD = 100


#Sobell_Filters
SOBELL_FILTER_HORIZONTAL = [-1,-2,-1,
							0,0,0,
							1,2,1]
SOBELL_FILTER_VERTICAL   = [-1,0,1,
							-2,0,2,
							-1,0,1]
SOBELL_FILTER_DIAGONAL_1 = [0,1,2,
							-1,0,1,
							-2,-1,0]
SOBELL_FILTER_DIAGONAL_2 = [0,1,2,
							-1,0,1,
							-2,-1,0]

def generate_random_noise_kernel(size):
	kernel = []
	for i in range(size*size):
		kernel.append(random.uniform(0.7,1))
	return kernel

def acquireImages():
    images = []
    for image_path in os.listdir(PLANT_IMAGE_FOLDER) :
        if(image_path.endswith(IMAGE_SUFFIX)):
            images.append(Image.open(PLANT_IMAGE_FOLDER + '/' +image_path))
    return images

def acquireTempImages():
    images = []
    for image_path in os.listdir(TEMP_IMAGE_FOLDER) :
        if(image_path.endswith(IMAGE_SUFFIX)):
            images.append(Image.open(TEMP_IMAGE_FOLDER + '/' +image_path))
    return images

#Test-section
def gaussian_kernel(l=5, sig=1.):
    ax = np.arange(-l // 2 + 1., l // 2 + 1.)
    xx, yy = np.meshgrid(ax, ax)
    kernel = np.exp(-0.5 * (np.square(xx) + np.square(yy)) / np.square(sig))
    return kernel / np.sum(kernel)
#Test-section


def applySobel(image):
	img = image
	width, height = img.size
	newimg = Image.new("RGB", (width, height), "white")
	for x in range(1, width-1):  
	    for y in range(1, height-1):

	        # initialise Gx to 0 and Gy to 0 for every pixel
	        Gx = 0
	        Gy = 0

	        # top left pixel
	        p = img.getpixel((x-1, y-1))
	        r = p[0]
	        g = p[1]
	        b = p[2]

	        # intensity ranges from 0 to 765 (255 * 3)
	        intensity = r + g + b

	        # accumulate the value into Gx, and Gy
	        Gx += -intensity
	        Gy += -intensity

	        # remaining left column
	        p = img.getpixel((x-1, y))
	        r = p[0]
	        g = p[1]
	        b = p[2]

	        Gx += -2 * (r + g + b)

	        p = img.getpixel((x-1, y+1))
	        r = p[0]
	        g = p[1]
	        b = p[2]

	        Gx += -(r + g + b)
	        Gy += (r + g + b)

	        # middle pixels
	        p = img.getpixel((x, y-1))
	        r = p[0]
	        g = p[1]
	        b = p[2]

	        Gy += -2 * (r + g + b)

	        p = img.getpixel((x, y+1))
	        r = p[0]
	        g = p[1]
	        b = p[2]

	        Gy += 2 * (r + g + b)

	        # right column
	        p = img.getpixel((x+1, y-1))
	        r = p[0]
	        g = p[1]
	        b = p[2]

	        Gx += (r + g + b)
	        Gy += -(r + g + b)

	        p = img.getpixel((x+1, y))
	        r = p[0]
	        g = p[1]
	        b = p[2]

	        Gx += 2 * (r + g + b)

	        p = img.getpixel((x+1, y+1))
	        r = p[0]
	        g = p[1]
	        b = p[2]

	        Gx += (r + g + b)
	        Gy += (r + g + b)

	        # calculate the length of the gradient (Pythagorean theorem)
	        length = math.sqrt((Gx * Gx) + (Gy * Gy))

	        # normalise the length of gradient to the range 0 to 255
	        length = length / 4328 * 255

	        length = int(length)

	        # draw the length in the edge image
	        #newpixel = img.putpixel((length,length,length))
	        newimg.putpixel((x,y),(length,length,length))
	return newimg

def compute_average_image_color(img):
    width, height = img.size
    r_total = 0
    g_total = 0
    b_total = 0
    count = 0
    for x in range(0, width):
        for y in range(0, height):
            r, g, b = img.getpixel((x,y))
            r_total += r
            g_total += g
            b_total += b
            count += 1
    if count > 0:
    	return (r_total/count, g_total/count, b_total/count)
    else:
    	return(0,0,0)


#Test section

def draw_artificial_damage(image):
	width, height = image.size
	filter_size = 20
	for x in range(1, width-1 - filter_size):
		for y in range(1, height-1 - filter_size):
			draw_damage_at(newimg, x,y,size)


def add_random_shapes_to_edges(image):
	width, height = image.size
	checkup_pts_x = [0,int(width/4),int(width/4)*2,int(width/4)*3,width-1]
	checkup_pts_y = [0,int(height/4),int(height/4)*2,int(height/4)*3,height-1]
	for x in checkup_pts_x:
		draw_random_shape(image, x)
	for y in checkup_pts_y:
		draw_random_shape(image, y, False)

def draw_random_shape(image, pos, at_x = True):
	shape_size_factor_1 = random.uniform(0,1)
	shape_size_factor_2 = random.uniform(0,1)
	width, height = image.size
	draw = ImageDraw.Draw(image)
	if at_x:
		shape_size = int(width*shape_size_factor_1)
		draw.ellipse([pos, 0- int(shape_size/2), pos + shape_size, 0+ int(shape_size/2)],(254,254,254))
		shape_size_2 = int(width*shape_size_factor_2)
		draw.ellipse([pos, height- int(shape_size_2/2), pos + shape_size, height+ int(shape_size_2/2)],(254,254,254))
	else:
		shape_size = int(height*shape_size_factor_1)
		draw.ellipse([0- int(shape_size/2),pos, 0+ int(shape_size/2),pos + shape_size],(254,254,254))
		shape_size_2 = int(height*shape_size_factor_2)
		draw.ellipse([width- int(shape_size/2),pos, width+ int(shape_size/2),pos + shape_size],(254,254,254))

def draw_damage_at(image, x,y, size):
	newimg = Image.new("RGB", (size, size), "white")
	darkening_gaussian_kernel = gaussian_kernel(size, 1)
	noise_kernel = generate_random_noise_kernel(size)
	light_or_dark = random.uniform(0,1)
	#darkening the image locally, using a gaussian kernel
	for x_x in range(1, size):
		for y_y in range(1, size):
			if (x_x + x < image.width) and (y_y + y < image.height):
				p = image.getpixel((x_x + x, y_y + y))
				r = int(p[0])
				g = int(p[1])
				b = int(p[2])
				newimg.putpixel((x_x,y_y),(r,g,b))
	average_color = compute_average_image_color(newimg)
	add_random_shapes_to_edges(newimg)
	i = 0
	for x_x in range(1, size):
		for y_y in range(1, size):
			i += 1
			if (x_x + x < image.width) and (y_y + y < image.height):
				p = image.getpixel((x_x + x, y_y + y))
				p_n = newimg.getpixel((x_x,y_y))
				darkening_factor = darkening_gaussian_kernel[x_x,y_y]
				if(light_or_dark > 0.5):
					darkening_factor = 1-darkening_gaussian_kernel[x_x,y_y]
				r = int((p[0] - (average_color[0]*0.5)))
				g = int((p[1] - (average_color[1]*0.5)))
				b = int((p[2] - (average_color[2]*0.5)))
				if ((r+g+b)/3 <= 128):
					image.putpixel((x_x + x,y_y + y),(int(r*noise_kernel[i]),int(g*noise_kernel[i]),int(b*noise_kernel[i])))
				if (p_n[0] > 220):
					image.putpixel((x_x + x,y_y + y),(p[0],p[1],p[2]))
	#add_random_shapes_to_edges(image)
	#draw = ImageDraw.Draw(image)
	#draw.ellipse([-5,-5,20,20], (200,200,200))
	#newimg.filter(ImageFilter.GaussianBlur(size))
	return image
	

def applySobelFiltersToImages(images):
	newImages = []
	for image in images:
		newImages.append(applySobel(image))
	for image in newImages:
		image.show()


def preProcessImages_Q(images):
    newImages = []
    for image in images:
        newImages.append(image
        .filter(ImageFilter.Kernel((3,3),LAPLACIAN_KERNEL))
        .convert('L')
        .point(lambda p: p > THRESHOLD and 255)
        .filter(ImageFilter.CONTOUR))
    for image in newImages:
        image.show()

def preProcessImages(images):
    newImages = []
    for image in images:
        newImages.append(image
        .filter(ImageFilter.GaussianBlur))
        image.show()

def generate_Template_Image():
	images = acquireTempImages()
	color_image = images[0]
	orig_image = images[1]
	width, height = color_image.size
	newimg = Image.new("RGB", (width, height), "white")
	for x in range(width):
		for y in range(height):
			p = color_image.getpixel((x,y))
			p_o = orig_image.getpixel((x,y))
			r = p[0]
			g = p[1]
			b = p[2]
			r_o = p_o[0]
			g_o = p_o[1]
			b_o = p_o[2]
			average_color = int((r+g+b)/3)
			if not(average_color <= 30):
				newimg.putpixel((x ,y),(p_o[0],p_o[1],p_o[2]))
	return newimg

def generate_random_pos_for_image(image):
	width, height = image.size
	random_factor_1 = random.uniform(0,1)
	random_factor_2 = random.uniform(0,1)
	return (int(width*random_factor_1)-1, int(height*random_factor_2)-1)

def generate_random_size_for_damage(image):
	width, height = image.size
	random_factor = random.uniform(0,1)
	return int((height/4)*random_factor)

def add_random_damage_to_plant(image):
	no_damage_pts = int(random.uniform(0,1) * 20)
	print(no_damage_pts)
	for i in range(no_damage_pts):
		random_pos = generate_random_pos_for_image(image)
		random_size = generate_random_size_for_damage(image)
		draw_damage_at(image,random_pos[0], random_pos[1], random_size)
	image.show()
			
#Debug running!!!!!!!!!
#acquireImages()[0].show()
#add_random_damage_to_plant(acquireImages()[0])
#generate_Template_Image().show()
image = acquireImages()[0]
for i in range(10):
	random_pos = generate_random_pos_for_image(image)
	random_size = generate_random_size_for_damage(image)
	image = draw_damage_at(image,random_pos[0], random_pos[1], random_size)
image.show()
#add_random_shapes_to_edges(acquireImages()[0]).show()
#draw_random_shape(acquireImages()[0], 200).show()
#print(gaussian_kernel(20,10))
#applySobelFiltersToImages(acquireImages())
#print(generate_random_noise_kernel(20))



def segmentImages(images):
    return 0

def calculateAT(images):
    return 0

def calculateAB(images):
    return 0

def gradeDiseases(images):
    return 0
