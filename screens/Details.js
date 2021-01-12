import React, {useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import { SharedElement } from 'react-navigation-shared-element';

import data from '../assets/data';
import Tall from '../assets/icons/tall.svg';
import Grande from '../assets/icons/grande.svg';
import Venti from '../assets/icons/venti.svg';

Feather.loadFont();
Octicons.loadFont();
Ionicons.loadFont();

const {height, width} = Dimensions.get('window');

const Details = ({navigation}) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const Slider = ({item, scrollX, index}) => {
    const translateX = scrollX.interpolate({
      inputRange: [(index - 1) * width, index * width, (index + 1) * width],
      outputRange: [-width / 2, 0, width / 2],
    });

    const scale = scrollX.interpolate({
      inputRange: [(index - 1) * width, index * width, (index + 1) * width],
      outputRange: [0.8, 1.25, 0.8],
    });

    return (
      <View
        style={{
          width,
        }}>
        <Animated.View style={styles.slider}>
          <View style={styles.sliderWrapper}>
            <Text style={styles.sliderText}>{item.name}</Text>
            <View style={styles.rating}>
              <Octicons name="star" size={15} style={styles.star} />
              <Octicons name="star" size={15} style={styles.star} />
              <Octicons name="star" size={15} style={styles.star} />
              <Octicons name="star" size={15} style={styles.star} />
              <Octicons name="star" size={15} style={styles.star} />
            </View>
          </View>
          <SharedElement id={`item.${item.id}.image_url`}>
          <Animated.Image
            source={item.image}
            style={[
              styles.sliderImage,
              {
                transform: [
                  {
                    translateX,
                  },
                  {
                    scale,
                  },
                ],
              },
            ]}
          />
          </SharedElement>
        </Animated.View>
        <View
          style={{
            marginTop: -100,
            width: 150,
            height: 150,
            borderRadius: 150,
            backgroundColor: '#f5f4f4',
            alignSelf: 'center',
            transform: [{rotateX: '75deg'}],
          }}
        />
      </View>
    );
  };
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <SafeAreaView>
        <View style={[styles.wrapper, styles.header]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={styles.backButton}>
            <Feather name="chevron-left" size={24} />
          </TouchableOpacity>
          <View style={styles.cartButton}>
            <Ionicons
              name="cart-outline"
              size={24}
              style={{color: '#227551'}}
            />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>3</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <View>
        <Animated.FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(data) => data.id}
          renderItem={({item, index}) => (
            <Slider item={item} scrollX={scrollX} index={index} />
          )}
          pagingEnabled
          scrollEventThrottle={16}
          decelerationRate={0}
          bounces={false}
          snapToInterval={width}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: scrollX,
                  },
                },
              },
            ],
            {
              useNativeDriver: true,
            },
          )}
        />
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.textBottom}>Available Sizes</Text>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.bottomMenu}>
          <View
            style={[
              styles.bottomMenuWrapper,
              {
                backgroundColor: '#1d724d',
              },
            ]}>
            <Tall width={40} height={40} />
            <Text
              style={{
                color: '#fff',
                fontWeight: 'bold',
              }}>
              Tall
            </Text>
            <Text
              style={{
                color: '#fff',
              }}>
              345ml
            </Text>
          </View>
          <View
            style={[
              styles.bottomMenuWrapper,
              {
                backgroundColor: '#f8f8f7',
              },
            ]}>
            <Grande width={40} height={40} />
            <Text
              style={{
                fontWeight: 'bold',
                color: '#2c2c2c',
              }}>
              Grade
            </Text>
            <Text
              style={{
                color: '#2c2c2c',
              }}>
              475ml
            </Text>
          </View>
          <View
            style={[
              styles.bottomMenuWrapper,
              {
                backgroundColor: '#f8f8f7',
              },
            ]}>
            <Venti width={40} height={40} />
            <Text
              style={{
                fontWeight: 'bold',
                color: '#2c2c2c',
              }}>
              Venti
            </Text>
            <Text
              style={{
                color: '#2c2c2c',
              }}>
              580ml
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.actionButtonWrapper}>
          <View style={styles.qtyWrapper}>
            <View style={styles.qtyButton}>
              <Feather name="minus" size={18} style={{color: '#2c2c2c'}} />
            </View>
            <Text style={styles.qtyText}>1</Text>
            <View style={styles.qtyButton}>
              <Feather name="plus" size={18} style={{color: '#2c2c2c'}} />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={styles.addCartButton}>
            <Text style={styles.addCartButtonText}>Add to cart</Text>
          </TouchableOpacity>
        </View>
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
  cartButton: {
    flexDirection: 'row',
  },
  badge: {
    backgroundColor: '#227551',
    width: 18,
    height: 18,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -8,
    marginLeft: -10,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
  },
  rating: {
    flexDirection: 'row',
  },
  star: {
    color: '#ffd202',
    marginRight: 2,
  },
  sliderImage: {
    width: '100%',
    height: width / 1.5,
    resizeMode: 'contain',
    marginVertical: 50,
  },
  slider: {
    alignItems: 'center',
  },
  sliderWrapper: {
    alignItems: 'center',
  },
  sliderText: {
    fontWeight: 'bold',
    fontSize: 23,
    color: '#555555',
    textAlign: 'center',
    width: width / 2,
  },
  textBottom: {
    textAlign: 'center',
    color: '#2c2c2c',
    fontWeight: 'bold',
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 30,
  },
  bottomMenuWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 40,
    borderColor: '#dadad9',
    borderWidth: 1,
  },
  actionButtonWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
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
    marginHorizontal: 20,
    fontWeight: 'bold',
  },
  qtyButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#dadad9',
    borderWidth: 1,
    borderRadius: 10,
    width: 40,
    height: 40,
  },
  addCartButton: {
    backgroundColor: '#1d724d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: '#dadad9',
    borderWidth: 1,
    borderRadius: 10,
  },
  addCartButtonText: {
    color: '#fff',
  },
});

export default Details;
