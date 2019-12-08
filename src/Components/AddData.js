import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native';
import Http from '../Public/Utils/Http';
import {
  Button,
  Container,
  Content,
  Text,
  View,
  Input,
  Item,
  Textarea,
} from 'native-base';

export default class AddData extends React.Component {
  constructor(props) {
    super();
    this.state = {
      name: '',
      message: '',
    };
  }
  postData = async () => {
    const nama = this.state.name;
    const pesan = this.state.message;
    await Http.post(`/api/data`, {
      name: nama,
      message: pesan,
    })
      .then(res => {
        if (res.data.status === 200) {
          ToastAndroid.show(
            'Success Create Data',
            ToastAndroid.TOP,
            ToastAndroid.SHORT,
          );
          this.props.navigation.navigate('Home');
        } else {
          alert('Product Already Exist');
        }
      })
      .catch(err => {
        this.setState({loading: false});
        console.log(err);
        alert('Connection Timeout');
      });
  };

  handleButton() {
    let data = this.state.text;
    this.setState({hasil: data});
  }
  handleClear() {
    this.setState({
      name: '',
      message: '',
    });
  }
  render() {
    return (
      <Container>
        <Content>
          <View>
            <View style={styles.viewTitle}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Home')}>
                <Text style={styles.title}>CREATE DATA</Text>
              </TouchableOpacity>
            </View>
            <Item regular style={styles.item}>
              <Input
                placeholder="Name"
                onChangeText={value => this.setState({name: value})}
              />
            </Item>
            <Item regular style={styles.item}>
              <Textarea
                placeholder="Message"
                rowSpan={5}
                onChangeText={value => this.setState({message: value})}
              />
            </Item>
            <View style={styles.viewButton}>
              <Button
                info
                style={styles.button}
                onPress={() => this.postData()}>
                <Text>SAVE</Text>
              </Button>
              <Button
                danger
                style={styles.button}
                onPress={() => this.handleClear()}>
                <Text>CANCEL</Text>
              </Button>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    marginHorizontal: 30,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  viewTitle: {
    marginVertical: 30,
  },
  text: {
    textAlign: 'center',
    fontSize: 24,
  },
  item: {
    marginVertical: 5,
    borderRadius: 5,
    borderColor: '#000',
    marginLeft: 20,
    marginRight: 20,
  },
});
