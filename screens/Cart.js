import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Feather from 'react-native-vector-icons/Feather';

import data from '../assets/data';

Feather.loadFont();

const {width, height} = Dimensions.get('window');

const Cart = ({navigation}) => {
  const [carts, setCarts] = useState(data);
  const [itemId, setItemId] = useState('');

  const fade = useRef(new Animated.Value(1)).current;

  const renderRight = ({item, progress, dragX, handleRemove}) => {
    const opacity = dragX.interpolate({
      inputRange: [-40, 0],
      outputRange: [1, 0],
    });

    return (
      <TouchableOpacity activeOpacity={1} onPress={() => handleRemove(item.id)}>
        <Animated.View
          style={{
            backgroundColor: '#247652',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            flex: 1,
            opacity,
            width: 60,
            transform: [
              {
                translateX: 0,
              },
            ],
          }}>
          <Feather name="trash-2" style={{color: '#fff'}} size={30} />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const Item = ({item}) => {
    const handleRemove = (id) => {
      setItemId(id);
      Animated.timing(fade, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        const filter = carts.filter((x) => x.id !== id);
        setCarts(filter);
      });
    };

    return (
      <Animated.View
        style={[
          styles.itemWrapper,
          {
            opacity: item.id === itemId ? fade : 1,
          },
        ]}>
        <Swipeable
          renderRightActions={(progress, dragX) =>
            renderRight({item, progress, dragX, handleRemove})
          }>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
            }}>
            <View>
              <Image source={item.image} style={styles.itemImage} />
            </View>
            <View
              style={{
                alignItems: 'flex-start',
                width: width / 2,
              }}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <View style={styles.qtyWrapper}>
                <View style={styles.qtyButton}>
                  <Feather name="minus" size={16} style={{color: '#2c2c2c'}} />
                </View>
                <Text style={styles.qtyText}>1</Text>
                <View style={styles.qtyButton}>
                  <Feather name="plus" size={16} style={{color: '#2c2c2c'}} />
                </View>
              </View>
            </View>
          </View>
        </Swipeable>
      </Animated.View>
    );
  };
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <SafeAreaView>
        <View style={[styles.wrapper, styles.header]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Details')}
            style={styles.backButton}>
            <Feather name="chevron-left" size={24} />
          </TouchableOpacity>
          <View>
            <Text style={styles.headerText}>Cart Items</Text>
          </View>
          <View style={{width: 20}} />
        </View>
      </SafeAreaView>
      <View style={{marginTop: 20}}>
        <FlatList
          contentContainerStyle={{paddingHorizontal: 20}}
          data={carts}
          keyExtractor={(data) => data.id}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => <Item item={item} fade={fade} />}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          paddingHorizontal: 20,
          paddingBottom: 60,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
        <View>
          <Text style={styles.totalText}>Total Price</Text>
          <Text style={styles.totalAmountText}>$19.5</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Order Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    zIndex: 9,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#f8f8f7',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowRadius: 2,
    shadowOpacity: 0.08,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#2c2c2c',
    fontSize: 15,
  },
  itemWrapper: {
    marginTop: 20,
    backgroundColor: '#f8f8f7',
    borderRadius: 20,
  },
  itemImage: {
    width: 80,
    height: 120,
    resizeMode: 'contain',
  },
  qtyWrapper: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f7',
    alignItems: 'center',
    borderColor: '#dadad9',
    borderWidth: 1,
    borderRadius: 10,
  },
  qtyText: {
    color: '#2c2c2c',
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  qtyButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#dadad9',
    borderWidth: 1,
    borderRadius: 10,
    width: 30,
    height: 30,
  },
  itemTitle: {
    fontWeight: 'bold',
    color: '#2c2c2c',
    fontSize: 16,
    marginBottom: 10,
  },
  totalText: {
    color: '#247652',
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  totalAmountText: {
    color: '#2c2c2c',
    fontWeight: 'bold',
    fontSize: 24,
  },
  button: {
    backgroundColor: '#1d724d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: '#dadad9',
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
  },
});

export default Cart;
