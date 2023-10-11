import {
  EnterKeyHintTypeOptions,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React, { Component } from 'react';
import { Colors } from '@/constants/colors';
import { EyeHide, EyeOpen } from '@/constants/icons';
import { scale, moderateScale } from 'react-native-size-matters';

interface InputPasswordPorps extends TextInputProps {
  placeholder: string;
  enterKeyHint?: undefined | EnterKeyHintTypeOptions;
  onSubmitEditing?: () => void;
}

interface InputPasswordState {
  passwordVisible: boolean;
  data?: string;
}

export class InputPassword extends Component<InputPasswordPorps, InputPasswordState> {
  constructor(props: InputPasswordPorps) {
    super(props);
    this.state = { passwordVisible: false };
  }
  render() {
    let eye;
    if (this.state.passwordVisible === false) {
      eye = (
        <EyeHide
          style={{ position: 'absolute', right: 20, top: '30%' }}
          onPress={() => this.setState({ passwordVisible: !this.state.passwordVisible })}
        />
      );
    } else {
      eye = (
        <EyeOpen
          style={{ position: 'absolute', right: 20, top: '30%' }}
          onPress={() => this.setState({ passwordVisible: !this.state.passwordVisible })}
        />
      );
    }
    return (
      <View>
        <TextInput
          {...this.props}
          autoCapitalize={'none'}
          enterKeyHint={this.props.enterKeyHint}
          secureTextEntry={!this.state.passwordVisible}
          maxLength={32}
          placeholder={this.props.placeholder}
          style={styles.TextInput}
          onSubmitEditing={this.props.onSubmitEditing}
          multiline={false}
        />
        {eye}
      </View>
    );
  }
}

interface ErrorProps {
  title: string;
}

export class Error extends Component<ErrorProps> {
  constructor(props: ErrorProps) {
    super(props);
  }
  render() {
    return (
      <View>
        <Text style={styles.errorText}>{this.props.title}</Text>
      </View>
    );
  }
}

interface InputLabelProps {
  title: string;
}

export class InputLabel extends Component<InputLabelProps> {
  constructor(props: InputLabelProps) {
    super(props);
  }
  render() {
    return <Text style={styles.InputLabel}>{this.props.title}</Text>;
  }
}

interface InputProps extends TextInputProps {
  title: string;
  error?: undefined | string;
  placeholder: string;
  type: 'Text' | 'Password' | 'Phone' | 'Email';
  enterKeyHint?: undefined | EnterKeyHintTypeOptions;
  onSubmitEditing?: () => void;
  onChangeText?: ((text: string) => void) | undefined;
}

export class Input extends Component<InputProps> {
  constructor(props: InputProps) {
    super(props);
  }
  render() {
    const inputStyles: any = [styles.TextInput];
    let error;
    if (this.props.error) {
      inputStyles.push(styles.inputError);
      error = <Error title={this.props.error} />;
    }

    let input;
    if (this.props.type === 'Password') {
      input = (
        <InputPassword
          onChangeText={(text) => this.props.onChangeText(text)}
          enterKeyHint={this.props.enterKeyHint}
          placeholder={this.props.placeholder}
        />
      );
    } else if (this.props.type === 'Phone') {
      input = (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            width: '100%',
          }}>
          <View
            style={{
              backgroundColor: Colors.LIGHT_GRAY,
              borderRadius: 14,
              padding: moderateScale(22),
            }}>
            <Text
              style={{ color: Colors.TEXT, fontFamily: 'Poppins-Medium', fontSize: scale(11.5) }}>
              +62
            </Text>
          </View>
          <TextInput
            {...this.props}
            onSubmitEditing={this.props.onSubmitEditing}
            enterKeyHint={this.props.enterKeyHint}
            style={styles.inputPhone}
            placeholder={this.props.placeholder}
            keyboardType="phone-pad"
          />
        </View>
      );
    } else {
      input = (
        <TextInput
          {...this.props}
          onSubmitEditing={this.props.onSubmitEditing}
          enterKeyHint={this.props.enterKeyHint}
          style={inputStyles}
          placeholder={this.props.placeholder}
          keyboardType={this.props.type === 'Email' ? 'email-address' : 'default'}
        />
      );
    }

    return (
      <View>
        <InputLabel title={this.props.title} />
        {input}
        {error}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  InputLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: scale(14),
    color: Colors.TEXT,
    marginBottom: 10,
  },
  TextInput: {
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 14,
    padding: moderateScale(18),
    width: '100%',
    color: Colors.TEXT,
    fontFamily: 'Poppins-Medium',
    fontSize: scale(11.5),
  },
  errorText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: scale(11),
    color: Colors.PRIMARY_RED,
    marginVertical: 5,
  },
  inputError: {
    borderWidth: 1,
    borderColor: Colors.PRIMARY_RED,
  },
  inputPhone: {
    backgroundColor: Colors.LIGHT_GRAY,
    borderRadius: 14,
    padding: moderateScale(18),
    alignSelf: 'stretch',
    justifyContent: 'center',
    flexGrow: 1,
  },
});

export default Input;
