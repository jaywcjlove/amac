import React, { Component } from 'react';
import ReactNative from 'react-native-macos';
const { View, Text, Image, Linking, StyleSheet, TouchableOpacity, ScrollView } = ReactNative;

type Props = {
  dataSource: Array,
};

export default class ButtonGroup extends React.Component<Props> {
  static defaultProps = {
    dataSource: [],
  }
  onPressLearnMore(item) {
    if (item && item.openURL) {
      Linking.openURL(item.openURL);
    }
  }
  render() {
    const { dataSource } = this.props;
    return (
      <View style={styles.btnGroup}>
        {dataSource.map((item, idx) => {
          return (
            <TouchableOpacity style={styles.item} key={idx} onPress={this.onPressLearnMore.bind(this, item)}>
              {item.label && <Text>{item.label}</Text>}
              {item.source && (
                <View style={styles.imgWarpper}>
                  <Image style={styles.img} source={item.source} />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 5,
  },
  imgWarpper: {
    // width: 18,
    // height: 18,
    // padding: 1,
  },
  img: {
    width: 16,
    height: 16,
  }
});