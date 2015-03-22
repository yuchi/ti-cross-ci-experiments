
echo ""
echo "# Executing https://raw.github.com/embarkmobile/android-sdk-installer"
echo ""

curl -L https://raw.github.com/embarkmobile/android-sdk-installer/version-2/android-sdk-installer | \
  bash /dev/stdin --install=build-tools-18.1.0,android-17,sys-img-armeabi-v7a-android-17 && \
  source ~/.android-sdk-installer/env

echo ""
echo "# Creating AVD"
echo ""

echo no | android create avd --force -n test -t android-17 --abi armeabi-v7a
emulator -avd test -no-skin -no-audio -no-window &
wait_for_emulator
