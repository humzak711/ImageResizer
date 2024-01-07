from flask import Flask, redirect, render_template, request, send_file,flash # backend framework
from PIL import Image # for resizing and processing image
from io import BytesIO # translates image contents to bytes 

# configurations
app = Flask(__name__)
app.secret_key = 'plwyetczfcbabuwgtyetrea'

# home page
@app.route('/home/')
@app.route('/')
def index():  
    return render_template('index.html')

# API to resize image
@app.route('/resize-image/<int:width>&<int:height>',methods=['POST'])
def resize_image(width:int, height:int) -> Image:

    '''API to retreive width, height and the image, resize the image then send it to the frontend'''

    if request.method == 'POST':
        try:
            # get new image dimensions
            width = int(width)
            height = int(height)

            # get image file
            image_file = request.files.get('image')
            
            # handle invalid file name
            if image_file is None or not image_file.filename: 
                flash('Could not resolve image, ensure you input a valid image file')
                return render_template('index.html')
        
            # open and resize the image file
            with Image.open(image_file) as image:
                resized_image = image.resize((width, height))

                # prepare image for sending to frontend
                buffer = BytesIO() 
                resized_image.save(buffer, format='JPEG') # save image data into a buffer
                buffer.seek(0) # reset buffer to allow it to be read from the beginning

                # send resized image to frontend by sending the contents of the buffer
                return send_file(buffer, mimetype='image/jpeg')
        
        except:
            flash('''ERROR: Could not process image correctly, 
                     Ensure you input a valid image and dimensions
                     Example input: Width: 100 Height: 100 Image: Image.jpg''')
            return render_template('index.html')
    else:
        return redirect('/404')
    
# run the app
if __name__ == '__main__':
    app.run()