$scope.initializeMap = function () {

  // Need to generate custom markers before map initialized
  $scope.generateCustomMarkerImage();

  $scope.generateCustomMarkerImage = function () {

    // Select hidden canvas element
    var canvas = document.getElementById('cluster');
    var context = canvas.getContext('2d');

    // Get center of canvas
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;

    // Play around with this for different marker size
    var radius = 10;

    context.beginPath();

    // Create marker circle
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);

    // Fill color
    // stateColor is a hex color value provided by the backend.
    // This could be a dynamic color depending on your implementation
    context.fillStyle = stateColor;

    // Fill circle
    context.fill();

    // Stroke Size
    context.lineWidth = 2;

    // Stroke Color
    context.strokeStyle = '#fff';

    // Draw Stroke
    context.stroke();

    // Convert canvas to Data URL and assign to variable
    $scope.markerImageData = canvas.toDataURL("image/png");
  };

  // set icon property in object to custom local generated image.
  $scope.markerOptions = {
    icon: $scope.getCanvasBlob()
  };

  $scope.getCanvasBlob = function () {

      // Assign canvas Data URL to variable
      var base64Data = $scope.markerImageData;

      // Remove Data URL start characters to assign only raw data
      var data = base64Data.replace('data:image/png;base64,', '');

      // Start conversion from Base64 Data into actual image file.
      // See b64toBlob function to step through
      var blob = b64toBlob(data, 'image/png');

      // Create local temp URL for image path.
      var blobUrl = URL.createObjectURL(blob);

      return blobUrl;
  };

  function b64toBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || '';
      sliceSize = sliceSize || 512;

      var byteCharacters = atob(b64Data);
      var byteArrays = [];

      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);

          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }

          var byteArray = new Uint8Array(byteNumbers);

          byteArrays.push(byteArray);
      }

      var blob = new Blob(byteArrays, {type: contentType});
      return blob;
  }

  // Set up
  $scope.map = {
    center: {
      latitude: $scope.stateCoords.lat,
      longitude: $scope.stateCoords.long
    },
    zoom: 7
  };
};