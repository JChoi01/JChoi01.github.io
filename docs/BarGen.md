---
layout: default
title: Barcode Generator
nav_order: 7
nav_exclude: true
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Real-Time Code 39 Barcode Generator</title>
    <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js"></script>
    <style>
        .barcode-container {
            text-align: center;
            padding: 50px;
        }
        .barcode-input {
            padding: 10px;
            font-size: 16px;
            width: 300px;
            margin-bottom: 20px;
        }
        .barcode-label {
            display: block;
            margin-top: 30px;
            font-size: 16px;
            font-weight: bold;
        }
        .barcode-range {
            width: 300px;
            margin-top: 10px;
        }
        .barcode-value {
            font-size: 18px;
            font-weight: bold;
            margin-left: 10px;
        }
        .barcode-svg {
            margin-top: 20px;
        }
    </style>
</head>
<body onload="generateBarcode()">
    <div class="barcode-container">
        <h1>바코드 형성기(CODE 39)</h1>
        <p>xxxx-xx-xx-xx-xxxx에서 하이픈 제거하고 입력하세요.</p>
        <input type="text" id="barcodeInput" class="barcode-input" placeholder="Enter text to generate barcode" value="text or number" oninput="generateBarcode()">
        <br>
        <label for="widthRange" class="barcode-label">가로 길이 조절(Barcode Width):</label>
        <input type="range" id="widthRange" class="barcode-range" min="1" max="5" value="2" oninput="generateBarcode()">
        <span id="widthValue" class="barcode-value">2</span>
        <br>
        <label for="heightRange" class="barcode-label">세로 길이 조절(Barcode Height):</label>
        <input type="range" id="heightRange" class="barcode-range" min="50" max="200" value="100" oninput="generateBarcode()">
        <span id="heightValue" class="barcode-value">100</span>
        <br>
        <svg id="barcode" class="barcode-svg"></svg>
    </div>
    <script>
        function generateBarcode() {
            var input = document.getElementById('barcodeInput').value;
            var width = document.getElementById('widthRange').value;
            var height = document.getElementById('heightRange').value;
            document.getElementById('widthValue').textContent = width;
            document.getElementById('heightValue').textContent = height;
            console.log("Generating barcode with value:", input, "width:", width, "and height:", height);
            JsBarcode("#barcode", input, {
                format: "CODE39",
                displayValue: true,
                height: Number(height),
                width: Number(width)
            });
        }

        document.addEventListener("DOMContentLoaded", function() {
            console.log("Page loaded, generating initial barcode");
            generateBarcode();
        });
    </script>
</body>
</html>
































