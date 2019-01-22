#!/bin/bash

python3 -m label_image \
  --graph=tf_files/retrained_graph.pb  \
  --image=images/img.jpg

  # python3 -m scripts.label_image \
  # --graph=tf_files/retrained_graph.pb  \
  # --image=/Users/mariecarter/Downloads/lithops1.jpg
