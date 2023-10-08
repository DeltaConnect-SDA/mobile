import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { Component } from 'react';
import { Colors } from '@/constants/colors';

type ButtonType = 'Primary' | 'Secondary' | 'Disabled' | 'Text' | 'Outline';

type ButtonSize = 'Lg' | 'Md' | 'Sm';

interface PropTypes {
  title: string;
  type: ButtonType;
  size: ButtonSize;
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  style?: object;
}

export class Button extends Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);
  }
  render() {
    if (this.props.type === 'Primary') {
      switch (this.props.size) {
        case 'Lg':
          return (
            <Pressable
              style={({ pressed }) => [
                styles.container,
                pressed ? { opacity: 0.9 } : {},
                {
                  width: '100%',
                  paddingVertical: 14,
                  backgroundColor: Colors.PRIMARY_GREEN,
                },
                this.props.style,
              ]}
              onPress={this.props.onPress}>
              <Text style={styles.text}>{this.props.title}</Text>
            </Pressable>
          );
        case 'Md':
          return (
            <Pressable
              style={({ pressed }) => [
                styles.container,
                pressed ? { opacity: 0.9 } : {},
                {
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  backgroundColor: Colors.PRIMARY_GREEN,
                },
                this.props.style,
              ]}
              onPress={this.props.onPress}>
              <Text style={styles.text}>{this.props.title}</Text>
            </Pressable>
          );
        case 'Sm':
          return (
            <Pressable
              style={({ pressed }) => [
                styles.container,
                pressed ? { opacity: 0.9 } : {},
                {
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  backgroundColor: Colors.PRIMARY_GREEN,
                },
                this.props.style,
              ]}
              onPress={this.props.onPress}>
              <Text style={[styles.text, { fontSize: 12 }]}>{this.props.title}</Text>
            </Pressable>
          );
      }
    } else if (this.props.type === 'Secondary') {
      switch (this.props.size) {
        case 'Lg':
          return (
            <Pressable
              style={({ pressed }) => [
                styles.container,
                pressed ? { opacity: 0.4 } : {},
                {
                  width: '100%',
                  paddingVertical: 14,
                  backgroundColor: Colors.SECONDARY_GREEN,
                },
                this.props.style,
              ]}
              onPress={this.props.onPress}>
              <Text style={[styles.text, { color: Colors.PRIMARY_GREEN }]}>{this.props.title}</Text>
            </Pressable>
          );
        case 'Md':
          return (
            <Pressable
              style={({ pressed }) => [
                styles.container,
                pressed ? { opacity: 0.4 } : {},
                {
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  backgroundColor: Colors.SECONDARY_GREEN,
                },
                this.props.style,
              ]}
              onPress={this.props.onPress}>
              <Text style={[styles.text, { color: Colors.PRIMARY_GREEN }]}>{this.props.title}</Text>
            </Pressable>
          );
        case 'Sm':
          return (
            <Pressable
              style={({ pressed }) => [
                styles.container,
                pressed ? { opacity: 0.4 } : {},
                {
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  backgroundColor: Colors.SECONDARY_GREEN,
                },
                this.props.style,
              ]}
              onPress={this.props.onPress}>
              <Text style={[[styles.text, { color: Colors.PRIMARY_GREEN }], { fontSize: 12 }]}>
                {this.props.title}
              </Text>
            </Pressable>
          );
      }
    } else if (this.props.type === 'Outline') {
      switch (this.props.size) {
        case 'Lg':
          return (
            <Pressable
              style={({ pressed }) => [
                styles.container,
                pressed ? { opacity: 0.4 } : {},
                {
                  width: '100%',
                  paddingVertical: 14,
                  borderColor: Colors.PRIMARY_GREEN,
                  borderWidth: 1,
                },
                this.props.style,
              ]}
              onPress={this.props.onPress}>
              <Text style={[styles.text, { color: Colors.PRIMARY_GREEN }]}>{this.props.title}</Text>
            </Pressable>
          );
        case 'Md':
          return (
            <Pressable
              style={({ pressed }) => [
                styles.container,
                pressed ? { opacity: 0.4 } : {},
                {
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  borderColor: Colors.PRIMARY_GREEN,
                  borderWidth: 1,
                },
                this.props.style,
              ]}
              onPress={this.props.onPress}>
              <Text style={[styles.text, { color: Colors.PRIMARY_GREEN }]}>{this.props.title}</Text>
            </Pressable>
          );
        case 'Sm':
          return (
            <Pressable
              style={({ pressed }) => [
                styles.container,
                pressed ? { opacity: 0.4 } : {},
                {
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  borderColor: Colors.PRIMARY_GREEN,
                  borderWidth: 1,
                },
                this.props.style,
              ]}
              onPress={this.props.onPress}>
              <Text style={[[styles.text, { color: Colors.PRIMARY_GREEN }], { fontSize: 12 }]}>
                {this.props.title}
              </Text>
            </Pressable>
          );
      }
    } else if (this.props.type === 'Disabled') {
      switch (this.props.size) {
        case 'Lg':
          return (
            <Pressable
              style={[
                styles.container,
                {
                  width: '100%',
                  paddingVertical: 14,
                  backgroundColor: Colors.LINE_STROKE,
                },
                this.props.style,
              ]}>
              <Text style={[styles.text, { color: Colors.GRAY }]}>{this.props.title}</Text>
            </Pressable>
          );
        case 'Md':
          return (
            <Pressable
              style={[
                styles.container,
                {
                  paddingVertical: 12,
                  paddingHorizontal: 24,
                  backgroundColor: Colors.LINE_STROKE,
                },
                this.props.style,
              ]}>
              <Text style={[styles.text, { color: Colors.GRAY }]}>{this.props.title}</Text>
            </Pressable>
          );
        case 'Sm':
          return (
            <Pressable
              style={[
                styles.container,
                {
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  backgroundColor: Colors.LINE_STROKE,
                },
                this.props.style,
              ]}>
              <Text style={[[styles.text, { color: Colors.GRAY }], { fontSize: 12 }]}>
                {this.props.title}
              </Text>
            </Pressable>
          );
      }
    } else if (this.props.type === 'Text') {
      switch (this.props.size) {
        case 'Lg':
          return (
            <Pressable
              style={({ pressed }) => [pressed ? { opacity: 0.4 } : {}, this.props.style]}
              onPress={this.props.onPress}>
              <Text style={[styles.text, { color: Colors.PRIMARY_GREEN }, this.props.style]}>
                {this.props.title}
              </Text>
            </Pressable>
          );
        case 'Md':
          return (
            <Pressable
              style={({ pressed }) => [pressed ? { opacity: 0.4 } : {}, this.props.style]}
              onPress={this.props.onPress}>
              <Text
                style={[
                  { color: Colors.PRIMARY_GREEN, fontFamily: 'Poppins-Medium', fontSize: 13 },
                  this.props.style,
                ]}>
                {this.props.title}
              </Text>
            </Pressable>
          );
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    borderRadius: 8,
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
});

export default Button;
