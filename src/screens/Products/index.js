import React, {useEffect} from 'react';
import {Text, View, FlatList, StyleSheet} from 'react-native';
import {Image} from 'react-native';

import {connect} from 'react-redux';

import {requestAllProducts} from '../../redux/actions/products';

const mapStateToProps = state => ({
  products: state.getProductsReducer.products,
});
const mapDispatchToProps = dispatch => ({dispatch});

const ProductsScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(props => {
  const {products, dispatch} = props;

  useEffect(() => {
    dispatch(requestAllProducts());
  }, []);

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={products.products}
        keyExtractor={item => item.id}
        horizontal={false}
        numColumns={2}
        renderItem={({item, index}) => {
          return (
            <View style={styles.wrapper}>
              <Image
                style={styles.image}
                key={index}
                source={{uri: `${item.images[0]}`}}
              />
            </View>
          );
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 200,
  },
});

export default ProductsScreen;

// export default connect(mapStateToProps, mapDispatchToProps)(Home);
