import React from 'react'
import { Text, StyleSheet, Pressable } from 'react-native'

export function DefaultButton(props) {
  const { onPress, title = 'Save' } = props

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#4D4C7D'
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'normal',
    letterSpacing: 0.25,
    color: 'white'
  }
})
