import cv2

import os
import json

subjects=[]

with open('members.json') as json_data:
    d = json.load(json_data)
    subjects=d["members"]

file="./training-data"

directory=file + "/s" + str(len(subjects))
if not os.path.exists(directory):
    os.makedirs(directory)

cam = cv2.VideoCapture(0)

cv2.namedWindow("test")

img_counter = 0

k = cv2.waitKey(10)


while True:
    ret, frame = cam.read()
    cv2.imshow("test", frame)
    if not ret:
        break
    k = cv2.waitKey(30)

    if k%256 == 27:
    
        print("Escape hit, closing...")
        break
        
    img_name = "training-data/s"+str(len(subjects))+"/{}.jpg".format(img_counter)
    cv2.imwrite(img_name, frame, [int(cv2.IMWRITE_JPEG_QUALITY), 100])
    print("{} written!".format(img_name))
    img_counter += 1

cam.release()

cv2.destroyAllWindows()
