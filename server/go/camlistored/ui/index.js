/*
Copyright 2011 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

function btnCreateNewPermanode(e) {
    camliCreateNewPermanode(
        {
            success: function(blobref) {
               window.location = "./?p=" + blobref;
            },
            fail: function(msg) {
                alert("create permanode failed: " + msg);
            }
        });
}

function indexOnLoad(e) {
    var btnNew = document.getElementById("btnNew");
    if (!btnNew) {
        alert("missing btnNew");
    }
    btnNew.addEventListener("click", btnCreateNewPermanode);
    camliGetRecentlyUpdatedPermanodes({ success: indexBuildRecentlyUpdatedPermanodes });
}

function indexBuildRecentlyUpdatedPermanodes(searchRes) {
    var div = document.getElementById("recent");
    div.innerHTML = "";
    for (var i = 0; i < searchRes.results.length; i++) {
        var result = searchRes.results[i];      
        var title = function() {
            var attr = result.attr;
            if (!attr || !attr.title) {
                return result.blobref;
            }
            return attr.title[0];
        };
        var pdiv = document.createElement("li");
        var alink = document.createElement("a");
        alink.href = "./?p=" + result.blobref;
        alink.innerText = title();
        pdiv.appendChild(alink);
        div.appendChild(pdiv);
    }
}

window.addEventListener("load", indexOnLoad);
