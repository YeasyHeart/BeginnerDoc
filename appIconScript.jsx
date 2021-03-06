// BEAD POND MEDIA, KIFFIN AYERS UPDATE: I added the ability to get all of the needed square icons and an "Apple Home Screen" icon to use for your website or web app.
//
// Photoshop Script to Create iPhone Icons from iTunesArtwork
//
// WARNING!!! In the rare case that there are name collisions, this script will
// overwrite (delete perminently) files in the same folder in which the selected
// iTunesArtwork file is located. Therefore, to be safe, before running the
// script, it's best to make sure the selected iTuensArtwork file is the only
// file in its containing folder.
//
// Copyright (c) 2010 Matt Di Pasquale
// Added tweaks Copyright (c) 2012 by Josh Jones http://www.appsbynight.com
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// Prerequisite:
// First, create at least a 1024x1024 px PNG file according to:
// http://developer.apple.com/library/ios/#documentation/iphone/conceptual/iphoneosprogrammingguide/BuildTimeConfiguration/BuildTimeConfiguration.html
//
// Install - Save Create Icons.jsx to:
//   Win: C:\Program Files\Adobe\Adobe Utilities\ExtendScript Toolkit CS5\SDK
//   Mac: /Applications/Utilities/Adobe Utilities/ExtendScript Toolkit CS5/SDK
// * Restart Photoshop
//
// Update:
// * Just modify & save, no need to resart Photoshop once it's installed.
//
// Run:
// * With Photoshop open, select File > Scripts > Create Icons
// * When prompted select the prepared iTunesArtwork file for your app.
// * The different version of the icons will get saved to the same folder that
//   the iTunesArtwork file is in.
//
// Adobe Photoshop JavaScript Reference
// http://www.adobe.com/devnet/photoshop/scripting.html


// Turn debugger on. 0 is off.
// $.level = 1;

try
{
  // Prompt user to select iTunesArtwork file. Clicking "Cancel" returns null.
  var iTunesArtwork = File.openDialog("Select a sqaure PNG file that is at least 1024x1024.", "*.png", false);

  if (iTunesArtwork !== null) 
  { 
    var doc = open(iTunesArtwork, OpenDocumentType.PNG);
    
    if (doc == null)
    {
      throw "Something is wrong with the file.  Make sure it's a valid PNG file.";
    }

    var startState = doc.activeHistoryState;       // save for undo
    var initialPrefs = app.preferences.rulerUnits; // will restore at end
    app.preferences.rulerUnits = Units.PIXELS;     // use pixels

    if (doc.width != doc.height)
    {
        throw "Image is not square";
    }
    else if ((doc.width < 1024) && (doc.height < 1024))
    {
        throw "Image is too small!  Image must be at least 1024x1024 pixels.";
    }
    else if (doc.width < 1024)
    {
        throw "Image width is too small!  Image width must be at least 1024 pixels.";
    }
    else if (doc.height < 1024)
    {
        throw "Image height is too small!  Image height must be at least 1024 pixels.";
    }
    
    // Folder selection dialog
    var destFolder = Folder.selectDialog( "Choose an output folder");

    if (destFolder == null)
    {
      // User canceled, just exit
      throw "";
    }

    // Save icons in PNG using Save for Web.
    var sfw = new ExportOptionsSaveForWeb();
    sfw.format = SaveDocumentType.PNG;
    sfw.PNG8 = false; // use PNG-24
    sfw.transparency = true;
    doc.info = null;  // delete metadata
    
    var icons = [
/*       {"name": "iTunesArtwork@2x", "size":1024},
      {"name": "iTunesArtwork",    "size":512},
      {"name": "Icon",             "size":57},
      {"name": "Icon@2x",          "size":114},
      {"name": "Icon@3x",          "size":171},
      {"name": "Icon-60",             "size":60},
      {"name": "Icon-60@2x",          "size":120},
      {"name": "Icon-60@3x",          "size":180},
      {"name": "Icon-72",          "size":72},
      {"name": "Icon-72@2x",       "size":144},
      {"name": "Icon-72@3x",       "size":216},
      {"name": "Icon-76",             "size":76},
      {"name": "Icon-76@2x",          "size":152},
      {"name": "Icon-76@3x",          "size":228},
      {"name": "Icon-Small",       "size":29},
      {"name": "Icon-Small@2x",    "size":58},
      {"name": "Icon-Small@3x",    "size":87},
      {"name": "Icon-Small-40",    "size":40},
      {"name": "Icon-Small-40@2x", "size":80},
      {"name": "Icon-Small-40@3x", "size":120},
      {"name": "Icon-Small-50",    "size":50},
      {"name": "Icon-Small-50@2x", "size":100},
      {"name": "Icon-Small-50@3x", "size":150},
      {"name": "Icon-170",             "size":170},
      {"name": "Icon-300",             "size":300},
      {"name": "Icon-ldpi",             "size":36},
      {"name": "Icon-mdpi",             "size":48},
      {"name": "Icon-hdpi",             "size":72},
      {"name": "Icon-xhdpi",             "size":96},
      {"name": "Icon-xxhdpi",             "size":144},
      {"name": "Icon-xxxhdpi",          "size":192},
      {"name": "apple-touch-icon",          "size":128},
      {"name": "Icon-Amazon",       "size":114},
      {"name": "favicon",          "size":16},
      {"name": "Icon-16",          "size":16},
      {"name": "Icon-24",          "size":24},
      {"name": "Icon-32",          "size":32},
      {"name": "Icon-64",          "size":64},
      {"name": "Icon-120",          "size":120},
      {"name": "Icon-152",          "size":152}, */
	  
	  {"name": "Icon-29",    "size":29},
	  {"name": "Icon-32",    "size":32},
	  {"name": "Icon-40",    "size":40},
	  {"name": "Icon-48",    "size":48},
	  {"name": "Icon-50",    "size":50},
	  {"name": "Icon-57",    "size":57},
	  {"name": "Icon-58",    "size":58},
	  {"name": "Icon-72",    "size":72},
	  {"name": "Icon-76",    "size":76},
	  {"name": "Icon-80",    "size":80},
	  {"name": "Icon-87",    "size":87},
	  {"name": "Icon-100",    "size":100},
	  {"name": "Icon-114",    "size":114},
	  {"name": "Icon-120",    "size":120},
	  {"name": "Icon-144",    "size":144},
	  {"name": "Icon-152",    "size":152},
	  {"name": "Icon-180",    "size":180},
      ];

// The "apple-touch-icon" can be added to the root directory of your website to be used as the icon if someone bookmarks your site on their device, e.g. "Add to Home Screen"

    var icon;
    for (i = 0; i < icons.length; i++) 
    {
      icon = icons[i];
      doc.resizeImage(icon.size, icon.size, // width, height
                      null, ResampleMethod.BICUBICSHARPER);

      var destFileName = icon.name + ".png";

      doc.exportDocument(new File(destFolder + "/" + destFileName), ExportType.SAVEFORWEB, sfw);
      doc.activeHistoryState = startState; // undo resize
    }

    alert("App Icons created!");
  }
}
catch (exception)
{
  // Show degbug message and then quit
	if ((exception != null) && (exception != ""))
    alert(exception);
 }
finally
{
    if (doc != null)
        doc.close(SaveOptions.DONOTSAVECHANGES);
  
    app.preferences.rulerUnits = initialPrefs; // restore prefs
}
