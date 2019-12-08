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

export default class EditData extends React.Component {
  constructor(props) {
    super();
    this.state = {
      id: '',
      name: '',
      message: '',
    };
  }

  componentDidMount() {
    this.setState({
      name: this.props.navigation.getParam('name'),
      message: this.props.navigation.getParam('message'),
      id: this.props.navigation.getParam('id'),
    });
  }
  putData = async () => {
    const id = this.state.id;
    const nama = this.state.name;
    const pesan = this.state.message;
    await Http.put(`/api/data/${id}`, {
      name: nama,
      message: pesan,
    })
      .then(result => {
        ToastAndroid.show(
          'Success Edit Data',
          ToastAndroid.TOP,
          ToastAndroid.SHORT,
        );
        this.props.navigation.navigate('Home');
      })
      .catch(err => {
        console.log(err);
        alert('Failed Edit Data');
      });
  };
  handleClear() {
    this.setState({
      name: '',
      message: '',
    });
  }
  onChangeTextName = name => this.setState({name});
  onChangeTextMessage = message => this.setState({message});
  render() {
    console.log(this.state);
    return (
      <Container>
        <Content>
          <View>
            <View style={styles.viewTitle}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Home')}>
                <Text style={styles.title}>EDIT DATA</Text>
              </TouchableOpacity>
            </View>
            <Item regular style={styles.item}>
              <Input
                value={this.state.name}
                placeholder="Name"
                onChangeText={this.onChangeTextName}
              />
            </Item>
            <Item regular style={styles.item}>
              <Textarea
                placeholder="Message"
                value={this.state.message}
                onChangeText={this.onChangeTextMessage}
                rowSpan={5}
              />
            </Item>
            <View style={styles.viewButton}>
              <Button info style={styles.button} onPress={() => this.putData()}>
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
