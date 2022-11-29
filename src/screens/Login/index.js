import React from 'react';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import {loginHandlerAction} from '../../redux/actions/loginHandler';

import {View, StyleSheet, TextInput, Button, Text} from 'react-native';

const mapStateToProps = state => ({
  isLogged: state.loginHandlerReducer.isLogged,
});
const mapDispatchToProps = dispatch => ({dispatch});

const LoginScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(props => {
  const {isLogged, dispatch} = props;
  const navigation = useNavigation();

  const [email, setEmail] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const {showError, setShowError} = React.useState(false);

  const onLoginHandler = async () => {
    navigation.navigate('Products');
    try {
      const login = await auth().signInWithEmailAndPassword(email, password);
      const data = await login.json();
    } catch (error) {
      if (error === 'TypeError: undefined is not a function') {
        dispatch(loginHandlerAction());
        return;
      }
      setShowError(true);
    }
  };

  const onRegisterHandler = () => {
    auth().createUserWithEmailAndPassword(email, password);
    setEmail(null);
    setPassword(null);
  };

  return (
    <View stlye={styles.wrapper}>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
      />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title="Login" onPress={onLoginHandler} />
        </View>
        <View style={styles.button}>
          <Button title="Register" onPress={onRegisterHandler} />
        </View>
      </View>
      {showError && (
        <View style={styles.error}>
          <Text style={styles.errorText}>Kullanıcı adı veya şifre hatalı</Text>
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  error: {
    height: 40,
    width: '100%',
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
  },
  errorText: {
    color: 'white',
    fontSize: 16,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  button: {
    width: '40%',
    marginRight: 20,
  },
});

export default LoginScreen;
