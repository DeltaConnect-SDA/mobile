import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React, { Component } from 'react';
import { Colors } from '@/constants/colors';
import { scale } from 'react-native-size-matters';

type ButtonType = 'Primary' | 'Secondary' | 'Disabled' | 'Text' | 'Outline';

type ButtonSize = 'Lg' | 'Md' | 'Sm';

interface PropTypes {
  title: string;
  type: ButtonType;
  size: ButtonSize;
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  icon?: any;
  isLoading?: false | boolean;
  backgroundColor?: string;
  color?: string;
}

export class Button extends Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);
  }
  render() {
    const { type, size, icon, style, onPress, isLoading, titleStyle, color, backgroundColor } =
      this.props;
    const buttonStyles: any = [styles.container];
    const textStyles: any = [styles.text];

    if (type === 'Primary') {
      buttonStyles.push(styles.primary);
      textStyles.push(styles.primaryText);
      if (color) {
        buttonStyles.push({ backgroundColor: backgroundColor });
      }
    } else if (type === 'Secondary') {
      buttonStyles.push(styles.secondary);
      textStyles.push(styles.secondaryText);
      if (color) {
        buttonStyles.push({ backgroundColor });
        textStyles.push({ color });
      }
    } else if (type === 'Outline') {
      buttonStyles.push(styles.outline);
      textStyles.push(styles.outlineText);
      if (color) {
        buttonStyles.push({ borderColor: color });
        textStyles.push({ color });
      }
    } else if (type === 'Disabled') {
      buttonStyles.push(styles.disabled);
      textStyles.push(styles.disabledText);
    } else if (type === 'Text') {
      buttonStyles.push(styles.textButton);
      textStyles.push(styles.textButtonText);
    }

    if (size === 'Lg') {
      buttonStyles.push(styles.large);
      textStyles.push(styles.textLarge);
    } else if (size === 'Md') {
      buttonStyles.push(styles.medium);
      textStyles.push(styles.textMedium);
    } else if (size === 'Sm') {
      buttonStyles.push(styles.small);
      textStyles.push(styles.textSmall);
    }
    return (
      <Pressable
        style={({ pressed }) => [
          type !== 'Text' && buttonStyles,
          style,
          pressed && { opacity: 0.6 },
          isLoading && { opacity: 0.8 },
        ]}
        onPress={onPress}
        disabled={type === 'Disabled' || isLoading}>
        {isLoading && (
          <ActivityIndicator
            size={'small'}
            color={type === 'Primary' ? 'white' : Colors.PRIMARY_GREEN}
          />
        )}
        {icon}
        <Text style={[textStyles, titleStyle]}>{this.props.title}</Text>
      </Pressable>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    textAlign: 'center',
    gap: 10,
  },
  text: {},
  primary: {
    backgroundColor: Colors.PRIMARY_GREEN,
  },
  primaryText: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    fontSize: scale(14),
  },
  secondary: {
    backgroundColor: '#CCEBDB',
  },
  secondaryText: {
    color: Colors.PRIMARY_GREEN,
    fontFamily: 'Poppins-SemiBold',
    fontSize: scale(14),
  },
  outline: {
    borderColor: Colors.PRIMARY_GREEN,
    borderWidth: 1,
  },
  outlineText: {
    color: Colors.PRIMARY_GREEN,
    fontFamily: 'Poppins-SemiBold',
    fontSize: scale(14),
  },
  disabled: {
    backgroundColor: Colors.LINE_STROKE,
  },
  disabledText: {
    color: Colors.GRAY,
    fontFamily: 'Poppins-SemiBold',
    fontSize: scale(14),
  },
  textButton: {},
  textButtonText: {
    color: Colors.PRIMARY_GREEN,
    fontFamily: 'Poppins-SemiBold',
    fontSize: scale(14),
  },
  large: {
    width: '100%',
    paddingVertical: 14,
  },
  textLarge: {
    fontSize: scale(14),
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  textMedium: {
    fontSize: scale(12),
  },
  small: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  textSmall: {
    fontSize: scale(12),
  },
});

export default Button;
