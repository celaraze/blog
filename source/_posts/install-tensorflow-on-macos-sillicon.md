---
title: 在 Apple M1 上安装 Tensorflow
date: 2021-09-09 14:57:44
tags:
  - apple
  - tensorflow
categories:
  - 运维
---

requirements.yml：

```
name: apple_tensorflow
channels:
  - conda-forge
  - nodefaults
dependencies:
  - absl-py
  - astunparse
  - gast
  - google-pasta
  - grpcio
  - h5py
  - ipython
  - keras-preprocessing
  - numpy
  - opt_einsum
  - pip=20.2.4
  - protobuf
  - python-flatbuffers
  - python=3.8
  - scipy
  - tensorboard
  - tensorflow-estimator
  - termcolor
  - typeguard
  - typing_extensions
  - wheel
  - wrapt
```

`conda env create --file=PATH_TO_ENVIRONMENT.YML --name=tf`

`conda activate tf`

`pip install --upgrade --force --no-dependencies https://github.com/apple/tensorflow_macos/releases/download/v0.1alpha3/tensorflow_addons_macos-0.1a3-cp38-cp38-macosx_11_0_arm64.whl https://github.com/apple/tensorflow_macos/releases/download/v0.1alpha3/tensorflow_macos-0.1a3-cp38-cp38-macosx_11_0_arm64.whl`

```
import tensorflow as tf
import time
 
mnist = tf.keras.datasets.mnist
 
(x_train, y_train),(x_test, y_test) = mnist.load_data()
x_train, x_test = x_train / 255.0, x_test / 255.0
 
model = tf.keras.models.Sequential([
  tf.keras.layers.Flatten(input_shape=(28, 28)),
  tf.keras.layers.Dense(128, activation='relu'),
  tf.keras.layers.Dropout(0.2),
  tf.keras.layers.Dense(10, activation='softmax')
])
 
model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])
 
 
start = time.time()
 
model.fit(x_train, y_train, epochs=5)
 
end = time.time()
 
model.evaluate(x_test, y_test)
print(end - start)
```