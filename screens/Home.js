import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Octicons from 'react-native-vector-icons/Octicons';
import data from '../assets/data';

const {height, width} = Dimensions.get('window');

const Home = ({navigation}) => {
  const Featured = ({item}) => {
    return (
      <View
        style={[
          styles.featured,
          {
            marginRight: item.id === '4' ? 20 : 0,
          },
        ]}>
        <Image source={item.image} style={styles.featuredImage} />
        <Text style={styles.featuredText}>{item.name}</Text>
      </View>
    );
  };

  const Popular = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Details')}
        style={[
          styles.popular,
          {
            marginLeft: item.id === '1' ? 20 : 0,
          },
        ]}>
        <Image source={item.image} style={styles.popularImage} />
        <Text style={styles.popularTitle}>{item.name}</Text>
        <View style={styles.action}>
          <View style={styles.rating}>
            <Octicons name="star" size={15} style={styles.star} />
            <Octicons name="star" size={15} style={styles.star} />
            <Octicons name="star" size={15} style={styles.star} />
            <Octicons name="star" size={15} style={styles.star} />
            <Octicons name="star" size={15} style={styles.star} />
          </View>
          <View style={styles.button}>
            <Feather
              name="chevron-right"
              size={15}
              style={{color: '#808080'}}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <SafeAreaView>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Good Morning</Text>
            <View style={styles.subHeader}>
              <Text style={styles.subtitle}>Beti</Text>
              <Feather
                name="coffee"
                size={24}
                style={{marginLeft: 10, color: '#8f8f8f'}}
              />
            </View>
          </View>
          <Feather
            name="grid"
            size={20}
            style={{
              color: '#8f8f8f',
            }}
          />
        </View>
      </SafeAreaView>
      <View style={styles.wrapper}>
        <View style={styles.search}>
          <Feather
            name="search"
            size={20}
            style={{
              color: '#d4d3d3',
              marginRight: 10,
            }}
          />
          <TextInput placeholder="Search" placeholderTextColor="#d4d3d3" />
        </View>
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.headerText}>Popular</Text>
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={(data) => data.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={Popular}
        />
      </View>
      <View style={styles.wrapper}>
        <View style={styles.wrapperTitle}>
          <Text style={styles.headerText}>Featured Item</Text>
          <Text style={styles.headerSubText}>See All</Text>
        </View>
      </View>
      <View>
        <FlatList
          data={data}
          keyExtractor={(data) => data.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={Featured}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#1d724d',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555555',
  },
  wrapper: {
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  wrapperTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f4f3f3',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 40,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2e2e2e',
  },
  headerSubText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#2e2e2e',
  },
  popular: {
    marginTop: 50,
    paddingLeft: 10,
    paddingRight: 20,
    marginRight: 60,
    backgroundColor: '#f8f8f7',
    height: height / 4,
    width: height / 5.5,
    borderRadius: 20,
    justifyContent: 'flex-end',
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 2,
    shadowOpacity: 0.08,
    position: 'relative',
  },
  popularTitle: {
    color: '#393939',
    fontWeight: '500',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  button: {
    width: 25,
    height: 25,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  rating: {
    flexDirection: 'row',
  },
  star: {
    color: '#ffd202',
    marginRight: 2,
  },
  popularImage: {
    width: 150,
    height: 180,
    resizeMode: 'contain',
    position: 'absolute',
    top: -60,
    right: -70,
    shadowColor: '#000',
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowRadius: 2,
    shadowOpacity: 0.08,
  },
  featured: {
    backgroundColor: '#f8f8f7',
    marginLeft: 20,
    width: width / 3 - 25,
    height: width / 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.08,
  },
  featuredText: {
    textAlign: 'center',
    fontSize: 12,
  },
  featuredImage: {
    width: 60,
    height: 100,
    resizeMode: 'contain',
    position: 'absolute',
    top: -25,
  },
});

export default Home;
