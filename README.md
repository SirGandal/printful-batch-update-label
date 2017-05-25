# printful-batch-update-label
As of today (May 24th, 2017), when editing a T-shirt product in Printful there's no way update the label so that it is applied to every variation of the product you are editing. This means that if you have one T-shirt in 4 sizes in 25 colors you will have to MANUALLY update each one of them. That's a lot of time, especially if you want to edit more than one T-shirt to have the same label.  

## Why?

I created the script because I had to update the label of 15 products each one of them having 100 variants. Doing it manually would take ages (~1000 clicks). For this reason I have created a sample Snippet that can be used in Chrome to automate the process and do the work for me.  

## How it works
### Step 1

On Google Chrome, from your Dashboard on Printful, go to your store and click _Edit_ on the product you want to edit. Open the Chrome Dev Tools (F12), go to _Sources_ top and select _Snippets_ on the left. You should see something like this:
![Step1](Images/Screenshot_1.JPG?raw=True)

### Step 2

Click on _New Snippet_ from the panel on the left and give it a name that you l ike, in this case _PrintfulSnippet_. Copy and paste the code from PrintfulSnippet.js in this repository. Hit save (Ctrl + S).
![Step2](Images/Screenshot_2.JPG?raw=True)

### Step 3

From your printful product page click on one product variation, click _Choose file_ for either the inside or outside label. The library for the labels should open. Hover on the label you want to apply to every product's variaton and note down the name of the file. In this case _JS_logo.png_.
![Step3](Images/Screenshot_3.JPG?raw=True)

### Step 4

Copy the file name on the left in the snippet replacing "LABEL_FILE_NAME". Depending on which type of label you want to update change the value of the variable _chosenLabelType_ to either OUTSIDE or INSIDE.
![Step4](Images/Screenshot_4.JPG?raw=True)

### Step 5

Close all the pop ups on your printful page, right click on the snippet and hit _Run_. The script will start to run and things will start to appear and flash on the screen. Don't worry, the script is doing what you would manually do by clicking things around. 
![Step5](Images/Screenshot_5.JPG?raw=True)


You can see the progress in the console at the bottom. If for some reason the snippet stops and doesn't proceed, note down what is the progress (e.g. 26) and reload the page. In the snippet from the left change the value of _fromRow_ from 0 to whatever number you wrote down. Repeat step 5.
![Step6](Images/Screenshot_6.JPG?raw=True)  
To change the label of other product simply repeat steps 1 to 6 but selecting a different product in the beginning.  

## Disclaimer
I contacted Printful's customer support and they have plans to support the feature in the feature but I couldn't get any specific date. The script relies on CSS class names and DOM structure and could suddenly stop working or misbehave. I don't plan to support it or update it unless I need to for my own use. Use this script at your own risk. 
