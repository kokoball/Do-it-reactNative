// 초기 모습
import React, {useCallback, useState, useRef, useEffect, useMemo} from 'react'
import type {FC} from 'react'
import {View, Text, Image, Alert, Animated, Easing} from 'react-native'
import {Colors} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment-with-locales-es6'
import * as D from '../data'
import {useToggle} from '../hooks' // 추가했습니다.
import {Avatar} from '../components'
import {styles} from './Person.style'
export type PersonProps = {
  person: D.IPerson
  deletePressed: () => void // 추가했습니다.
}

const PersonTransform: FC<PersonProps> = ({person, deletePressed}) => {
  // 바뀐 부분입니다.
  const avatarPressed = useCallback(() => Alert.alert('avatar pressed.'), [])
  return (
    <View style={[styles.view]}>
      <View style={[styles.leftView]}>
        <Avatar
          imageStyle={[styles.avatar]}
          uri={person.avatar}
          size={50}
          onPress={avatarPressed}
        />
        <Text style={[styles.text]}>Press Me</Text>
      </View>
      <View style={[styles.rightView]}>
        <Text style={[styles.name]}>{person.name}</Text>
        <Text style={[styles.email]}>{person.email}</Text>
        <View style={[styles.dateView]}>
          <Text style={[styles.text]}>
            {moment(person.createdDate).startOf('day').fromNow()}
          </Text>
          <Icon
            name="trash-can-outline"
            size={26}
            color={Colors.lightBlue500}
            onPress={deletePressed}
          />
        </View>
        <Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={[styles.text, styles.comments]}>
          {person.comments}
        </Text>
        <Image style={[styles.image]} source={{uri: person.image}} />
        <View style={[styles.countsView]}>
          <Icon name="comment" size={24} color={Colors.blue500} />
          <Icon name="twitter-retweet" size={24} color={Colors.purple500} />
          <Icon name="heart" size={24} color={Colors.red500} />
        </View>
      </View>
    </View>
  )
}
export default PersonTransform
// 최종 모습
/*
import React, {useCallback, useState} from 'react'
import type {FC} from 'react'
import {View, Text, Image, Animated, Easing} from 'react-native'
import {Colors} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment-with-locales-es6'
import * as D from '../data'
import {Avatar} from '../components'
import {styles} from './Person.style'
import {useToggle, useAnimatedValue, useStyle} from '../hooks'
import {interpolate} from '../utils'
export type PersonProps = {
  person: D.IPerson
  deletePressed: () => void
}

const PersonTransform: FC<PersonProps> = ({
  person: initialPerson,
  deletePressed
}) => {
  const [person, setPerson] = useState<D.IPerson>(initialPerson)
  const [started, toggleStarted] = useToggle(false)
  const animValue = useAnimatedValue(0)
  const nameAnimStyle = useStyle({
    transform: [
      {
        translateX: interpolate(animValue, [0, 500])
      }
    ]
  })
  const emailAnimStyle = useStyle({
    transform: [
      {
        rotate: interpolate(animValue, ['0deg', '180deg'])
      }
    ]
  })
  const commentsAnimStyle = useStyle({
    transform: [
      {
        translateY: interpolate(animValue, [0, 200])
      },
      {
        rotate: interpolate(animValue, ['0deg', '45deg'])
      },
      {
        scale: interpolate(animValue, [1, 2])
      }
    ]
  })
  const avatarPressed = useCallback(
    () =>
      Animated.timing(animValue, {
        useNativeDriver: false,
        toValue: started ? 0 : 1,
        easing: Easing.bounce
      }).start(toggleStarted),
    [started]
  )

  return (
    <View style={[styles.view]}>
      <View style={[styles.leftView]}>
        <Avatar uri={person.avatar} size={50} onPress={avatarPressed} />
        <Text>Press Me</Text>
      </View>
      <View style={[styles.rightView]}>
        <Animated.Text style={[styles.name, nameAnimStyle]}>
          {person.name}
        </Animated.Text>
        <Animated.Text style={[styles.email, emailAnimStyle]}>
          {person.email}
        </Animated.Text>
        <View style={[styles.dateView]}>
          <Text style={[styles.text]}>
            {moment(person.createdDate).startOf('day').fromNow()}
          </Text>
          <Icon
            name="trash-can-outline"
            size={26}
            color={Colors.lightBlue500}
            onPress={deletePressed}
          />
        </View>
        <Animated.Text
          numberOfLines={3}
          ellipsizeMode="tail"
          style={[styles.comments, commentsAnimStyle]}>
          {person.comments}
        </Animated.Text>
        <Image style={[styles.image]} source={{uri: person.image}} />
        <View style={[styles.countsView]}>
          <Icon name="comment" size={24} color={Colors.blue500} />
          <Icon name="twitter-retweet" size={24} color={Colors.purple500} />
          <Icon name="heart" size={24} color={Colors.red500} />
        </View>
      </View>
    </View>
  )
}
export default PersonTransform
*/
