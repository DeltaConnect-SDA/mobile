import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import { Back } from '@/constants/icons'
import { Colors } from 'react-native/Libraries/NewAppScreen'

interface PropTypes {
  title: string;
}

export default class TopNav extends Component<PropTypes> {
  constructor(props: PropTypes) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <Back width={24} height={24} />
        <Text style={styles.text}>{this.props.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  text: {
    color: Colors.TEXT,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16
  }
})