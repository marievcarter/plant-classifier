#!/bin/bash

python3 -m scripts.label_image \
  --graph=tf_files/retrained_graph.pb  \
  --image=/Users/mariecarter/Downloads/lithops1.jpg
