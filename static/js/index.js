// Function to handle image upload and resizing
function UploadAndResize() {
            // Retrieving HTML elements
            const ImageInput = document.getElementById('ImageUpload');
            const WidthInput = document.getElementById('width');
            const HeightInput = document.getElementById('height');
            const ResizedImage = document.getElementById('ResizedImage');
            const DownloadLink = document.getElementById('DownloadLink');
    
            // Retrieving user inputs
            const file = ImageInput.files[0]; // Get uploaded file
            const width = WidthInput.value; // Get desired width
            const height = HeightInput.value; // Get desired height
    
            // Checking if any field is empty
            if (!file || !width || !height) {
                alert('Please fill in all fields.');
                return;
            }
    
            // Preparing form data to send to the server
            const Form_Data = new FormData();
            Form_Data.append('image', file); // Append uploaded file
            Form_Data.append('width', width); // Append desired width
            Form_Data.append('height', height); // Append desired height
    
            // Sending image data to the server for resizing
            fetch('/resize-image/' + width + '&' + height, {
                method: 'POST',
                body: Form_Data // Including form data in the POST request
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to resize image');
                }
                return response.blob(); // Retrieving response data as a blob
            })
            .then(imageBlob => {
                // Creating URL for the resized image blob
                const imageURL = URL.createObjectURL(imageBlob);
    
                // Displaying resized image in the HTML
                ResizedImage.src = imageURL;
    
                // Setting download link for the resized image
                DownloadLink.href = imageURL;
                DownloadLink.style.display = 'block'; // Displaying the download link
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to resize image. Please try again.');
            });
}
