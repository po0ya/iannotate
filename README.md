# iannotate
This is a simple toolbox for annotating image datasets with binary labels and arbitrary size. It can be also used to just view output of different computer vision tasks like recognition or verification. Number of rows and columns and the width and height of the images in table cells can be adjusted. 

# How-to

Just clone the repository and open index.html in either Firefox or Chrome.
## Browse
Browse the .csv input file.
###Format of .csv filepath label map file
  ```
  classlabel0,classlabel0
  filepath0,classlabel0/1
  .
  .
  .
  filepathN,classlabel0/1
  ```
##

## Refresh
When you change image width/height or number of rows and cols to be displayed or page number, hit on refresh.

## Save
Save button will create a .csv file with the same format as input and save it.

##Example: Face verification
For face verification results, set number of columns to two and put paths image pairs consecutively, if pairs are the same person put 1 else 0.
```
0,1
pair_0_pers1.jpg,1
pair_0_pers2.jpg,1
pair_1_pers1.jpg,0
pair_1_pers2.jpg,0
...
```
##Example: Multi class 
This is not a very good tool for multiclass label visualization, but a good practice is to follow one-vs-all and put the classes as N,0 N being the class your looking at.
```
N,0
class0.jpg,0
class2.jpg,0
classN.jpg,N
...
```

## Matlab function
The matlab function in ./matlab directory can create sample .csv files if you prepare the labels and data
