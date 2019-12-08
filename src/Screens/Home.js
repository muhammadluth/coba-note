import React, {Component} from 'react';
import {StyleSheet, ToastAndroid} from 'react-native';
import Http from '../Public/Utils/Http';
import {
  Button,
  Container,
  Content,
  Text,
  View,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Thumbnail,
  Icon,
  Spinner,
} from 'native-base';

export default class Home extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getData();
    setInterval(this.getData, 1000);
  }
  getData = async () => {
    await Http.get(`/api/data`)
      .then(result => {
        this.setState({
          data: result.data.data,
          isLoading: false,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };
  deleteData = async id => {
    await Http.delete(`/api/data/${id}`)
      .then(result => {
        ToastAndroid.show(
          'Success Remove Data',
          ToastAndroid.TOP,
          ToastAndroid.SHORT,
        );
      })
      .catch(err => {
        console.log(err);
        alert('Failed Remove Data');
      });
  };

  render() {
    return (
      <Container>
        <Content>
          <View>
            <View style={styles.viewTitle}>
              <Text style={styles.title}>DASHBOARD</Text>
            </View>
            <View>
              <Button
                info
                style={styles.buttonAdd}
                onPress={() => this.props.navigation.navigate('AddData')}>
                <Text>Create Data</Text>
              </Button>
            </View>
            {this.state.isLoading === true ? (
              <Spinner />
            ) : (
              <View>
                {this.state.data.map(item => (
                  <List>
                    <ListItem thumbnail>
                      <Left>
                        <Thumbnail
                          square
                          source={{
                            uri: `https://ui-avatars.com/api/?size=256&rounded=true&name=${item.name}`,
                          }}
                        />
                      </Left>
                      <Body>
                        <Text>{item.name}</Text>
                        <Text note numberOfLines={1}>
                          {item.message}
                        </Text>
                      </Body>
                      <Right style={styles.right}>
                        <Button
                          warning
                          small
                          style={styles.button}
                          onPress={() =>
                            this.props.navigation.navigate('EditData', {
                              id: item.id,
                              name: item.name,
                              message: item.message,
                            })
                          }>
                          <Icon type="Ionicons" name="ios-create" />
                        </Button>
                        <Button
                          small
                          danger
                          style={styles.button}
                          onPress={() => this.deleteData(item.id)}>
                          <Icon type="Ionicons" name="ios-trash" />
                        </Button>
                      </Right>
                    </ListItem>
                  </List>
                ))}
              </View>
            )}
          </View>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  right: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: 5,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  viewTitle: {
    marginVertical: 30,
  },
  buttonAdd: {
    justifyContent: 'center',
  },
});
