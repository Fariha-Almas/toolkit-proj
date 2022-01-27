import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as LocalAuthentication from "expo-local-authentication";
import {
  View,
  StyleSheet,
  Text,
  Switch,
  Modal,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-root-toast";
import { colors, correctSize } from "../../theme";
import { RootSiblingParent } from "react-native-root-siblings";
import {
  disablePin,
  enablePin,
  userSelector,
  enableFingerPrint,
  disableFingerPrint,
  enableFaceId,
  disableFaceId,
  enable2FA,
  updateUser,
} from "../../redux/reducers/user";
import Verification from "../../components/common/Verification";
import Button from "../../components/common/Button";
import * as Clipboard from "expo-clipboard";
import ClipBoard from "../../assets/common/ClipBoard";

const MpinDialog = ({ open, close, value, setValue, handlePin }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {
        close(false);
      }}
    >
      <View style={styles.modal}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Enter PIN you want to use for your account
          </Text>
          <Text style={styles.modalSubTitle}>
            This PIN will be used to access your account
          </Text>
          <Verification
            message=" "
            displayHeader={false}
            value={value}
            setValue={setValue}
          />
          <View style={styles.modalButtonContainer}>
            <Button text="Save" onPress={() => handlePin()} />
            <Button text="Cancel" onPress={() => close(false)} />
          </View>
        </View>
      </View>
    </Modal>
  );
};
const Dialog = ({ open, secret, close }) => {
  const copyToClipboard = (address) => {
    Clipboard.setString(address);
    Toast.show("Copied to Clipboard", {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };

  return (
    <Modal animationType="slide" transparent={true} visible={open}>
      <RootSiblingParent>
        <View style={styles.modal}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>2FA Authentication</Text>
            <Text style={styles.modalSubTitle}>
              Please copy the following secret and save it in a safe place
            </Text>
            <View style={{ marginTop: correctSize(20) }}>
              <Text style={styles.label}>2FA Secret</Text>
              <TouchableOpacity
                style={styles.innerItem}
                onPress={() => copyToClipboard(secret)}
              >
                <Text style={[styles.selectedCoin, { width: "85%" }]}>
                  {secret}
                </Text>
                <ClipBoard />
              </TouchableOpacity>
            </View>
            <Button text="Done" onPress={() => close()} />
          </View>
        </View>
      </RootSiblingParent>
    </Modal>
  );
};
export default function Settings() {
  const [isBiometricSupported, setIsBiometricSupported] = React.useState(false);
  const [mPinDialog, setMPinDialog] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [support, setSupport] = React.useState([]);
  const [TwoFADialog, setTwoFADialog] = React.useState(false);
  const { user, mPinEnabled, fingerPrint, faceId, token } =
    useSelector(userSelector);
  const dispatch = useDispatch();
  const toggleSwitch = () => {
    dispatch(enable2FA({ token, value: !user.two_factor_authentication }));
  };

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
      const supportedBiometrics =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      setSupport(supportedBiometrics);
    })();
  }, []);
  const handleBiometricAuth = async (trigger) => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    console.warn(savedBiometrics);
    if (savedBiometrics) {
      switch (trigger) {
        case 0:
          const fingerPrintVar = await LocalAuthentication.authenticateAsync({
            promptMessage: "Verify your identity",
            cancelLabel: "Cancel",
            disableDeviceFallback: true,
          });
          if (fingerPrintVar.success) {
            dispatch(enableFingerPrint());
          }
          break;
        case 1:
          const faceIdVar = await LocalAuthentication.authenticateAsync({
            promptMessage: "Verify your identity",
            cancelLabel: "Cancel",
            disableDeviceFallback: true,
          });
          if (faceIdVar.success) {
            dispatch(enableFaceId());
          }
          break;
      }
      return;
    }
    alert("Please set up your biometric authentication first");
  };
  const handlePin = () => {
    if (value.length === 6) {
      dispatch(enablePin(value));
      setMPinDialog(false);
    } else {
      alert("Please enter a valid pin");
    }
  };
  useEffect(() => {
    if (user.two_factor_auth_secret) {
      setTwoFADialog(true);
    }
  }, [user.two_factor_auth_secret]);
  const close = () => {
    setTwoFADialog(false);
    dispatch(updateUser({ ...user, two_factor_auth_secret: null }));
  };
  return (
    <View style={styles.container}>
      <MpinDialog
        open={mPinDialog}
        close={(value) => setMPinDialog(value)}
        value={value}
        setValue={(val) => setValue(val)}
        handlePin={handlePin}
      />
      <Dialog
        open={TwoFADialog}
        close={close}
        secret={user.two_factor_auth_secret}
      />
      <View style={{ marginBottom: correctSize(20) }}>
        <Text style={styles.header}>Enable/Disable MPIN</Text>
        <View style={styles.item}>
          <Text style={styles.transactionText}>MPIN</Text>
          <Switch
            trackColor={{
              false: colors.blackBackground,
              true: colors.blackBackground,
            }}
            thumbColor={mPinEnabled ? colors.orange : colors.gray}
            ios_backgroundColor={colors.blackBackground}
            onValueChange={() =>
              mPinEnabled ? dispatch(disablePin()) : setMPinDialog(true)
            }
            value={mPinEnabled}
          />
        </View>
      </View>
      {isBiometricSupported && (
        <>
          {support.includes(1) && (
            <View style={{ marginBottom: correctSize(20) }}>
              <Text style={styles.header}>Add your Fingerprint</Text>
              <View style={styles.item}>
                <Text style={styles.transactionText}>Fingerprint</Text>
                <Switch
                  trackColor={{
                    false: colors.blackBackground,
                    true: colors.blackBackground,
                  }}
                  thumbColor={fingerPrint ? colors.orange : colors.gray}
                  ios_backgroundColor={colors.blackBackground}
                  onValueChange={() =>
                    fingerPrint
                      ? dispatch(disableFingerPrint())
                      : handleBiometricAuth(0)
                  }
                  value={fingerPrint}
                />
              </View>
            </View>
          )}
          {support.includes(2) && (
            <View style={{ marginBottom: correctSize(20) }}>
              <Text style={styles.header}>Enable/Disable your Face ID</Text>
              <View style={styles.item}>
                <Text style={styles.transactionText}>FaceLock</Text>
                <Switch
                  trackColor={{
                    false: colors.blackBackground,
                    true: colors.blackBackground,
                  }}
                  thumbColor={faceId ? colors.orange : colors.gray}
                  ios_backgroundColor={colors.blackBackground}
                  onValueChange={() =>
                    faceId ? dispatch(disableFaceId()) : handleBiometricAuth(1)
                  }
                  value={faceId}
                />
              </View>
            </View>
          )}
        </>
      )}
      <View style={{ marginBottom: correctSize(20) }}>
        <Text style={styles.header}>
          Enable/Disable 2 Factor Authentication
        </Text>

        <View style={styles.item}>
          <Text style={styles.transactionText}>2 Factor Authentication</Text>
          <Switch
            trackColor={{
              false: colors.blackBackground,
              true: colors.blackBackground,
            }}
            thumbColor={
              user.two_factor_authentication ? colors.orange : colors.gray
            }
            ios_backgroundColor={colors.blackBackground}
            onValueChange={() => toggleSwitch()}
            value={user.two_factor_authentication}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.blackBackground,
    flex: 1,
    padding: correctSize(32),
  },
  item: {
    backgroundColor: "#FFFFFF1C",
    paddingVertical: correctSize(16),
    paddingHorizontal: correctSize(12),
    marginBottom: correctSize(16),
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  transactionText: {
    color: "#fff",
    fontFamily: "Poppins",
    fontSize: correctSize(16),
  },
  transactionText: {
    color: "#fff",
    fontFamily: "Poppins",
    fontSize: correctSize(16),
  },
  header: {
    color: colors["light-gray"],
    marginBottom: correctSize(18),
    fontSize: correctSize(13),
    fontFamily: "Poppins",
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: correctSize(20),
    backgroundColor: colors.blackBackground,
  },
  modalTitle: {
    fontSize: correctSize(18),
    color: colors["white"],
    fontWeight: "bold",
  },
  modalSubTitle: {
    fontSize: correctSize(14),
    color: colors["light-gray"],
    marginTop: correctSize(8),
  },
  label: {
    color: colors["light-gray"],
    marginBottom: correctSize(18),
    fontSize: correctSize(13),
    fontFamily: "Poppins",
  },
  innerItem: {
    backgroundColor: "#FFFFFF1C",
    paddingVertical: correctSize(16),
    paddingHorizontal: correctSize(24),
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedCoin: {
    fontSize: correctSize(14),
    color: "#fff",
    fontFamily: "Poppins",
  },
});
