import { EnterKeyHintTypeOptions, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native'
import React, { Component } from 'react'
import { Colors } from '@/constants/colors'
import { EyeHide, EyeOpen } from '@/constants/icons';


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
        this.state = { passwordVisible: false }
    }
    render() {
        let eye;
        if (this.state.passwordVisible === false) {
            eye = <EyeHide style={{ position: 'absolute', right: 20, top: '30%' }} onPress={() => this.setState({ passwordVisible: !this.state.passwordVisible })} />
        } else {
            eye = <EyeOpen style={{ position: 'absolute', right: 20, top: '30%' }} onPress={() => this.setState({ passwordVisible: !this.state.passwordVisible })} />
        }
        return (
            <View>
                <TextInput
                    {...this.props}
                    enterKeyHint={this.props.enterKeyHint}
                    secureTextEntry={!this.state.passwordVisible}
                    maxLength={32}
                    placeholder={this.props.placeholder}
                    style={styles.TextInput}
                    onSubmitEditing={this.props.onSubmitEditing}
                />
                {eye}
            </View>
        )
    }
}

interface ErrorProps {
    title: string;
}

export class Error extends Component<ErrorProps> {
    constructor(props: ErrorProps) {
        super(props)
    }
    render() {
        return (
            <View>
                <Text style={styles.errorText}>{this.props.title}</Text>
            </View>
        )
    }
}

interface InputLabelProps {
    title: string
}

export class InputLabel extends Component<InputLabelProps> {
    constructor(props: InputLabelProps) {
        super(props)
    }
    render() {
        return (
            <Text style={styles.InputLabel}>{this.props.title}</Text>
        )
    }
}

interface InputProps extends TextInputProps {
    title: string;
    error?: undefined | string;
    placeholder: string;
    type: 'Text' | 'Password';
    enterKeyHint?: undefined | EnterKeyHintTypeOptions;
    onSubmitEditing?: () => void;
}

export class Input extends Component<InputProps> {
    constructor(props: InputProps) {
        super(props)
    }
    render() {
        let error;
        if (this.props.error) {
            error = <Error title={this.props.error} />;
        }

        let input;
        if (this.props.type === "Password") {
            input = <InputPassword enterKeyHint={this.props.enterKeyHint} placeholder={this.props.placeholder} />
        } else {
            input = <TextInput {...this.props} onSubmitEditing={this.props.onSubmitEditing} enterKeyHint={this.props.enterKeyHint} style={styles.TextInput} placeholder={this.props.placeholder} />
        }

        return (
            <View>
                <InputLabel title={this.props.title} />
                {input}
                {error}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    InputLabel: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: Colors.TEXT,
        marginBottom: 10
    },
    TextInput: {
        backgroundColor: Colors.LIGHT_GRAY,
        borderRadius: 14,
        padding: 20,
        width: '100%',
        color: Colors.TEXT,
        fontFamily: 'Poppins-Medium',
        fontSize: 13
    },
    errorText: {
        fontFamily: 'Poppins-Medium',
        fontSize: 12,
        color: Colors.RED,
        marginVertical: 5
    }
});

export default Input