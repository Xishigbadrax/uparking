/* eslint-disable react/prop-types */
import React from 'react';
import {Card, Row} from 'antd';
// eslint-disable-next-line react/prop-types
const Item = ({title, data, height=false}) => {
  return (
    <Card
      style={height?{height: '470px'}:{height: '370px'}}
      title={<span style={{color: 'grey', fontSize: '18px'}}>{title}</span>}
    >
      {data.map((e, i) => {
        return (
          <Row
            key={i}
            style={{
              justifyContent: 'space-between',
              borderBottom: `${
                i !== Object.values(data).length - 1 ?
                  '0.5px dotted gray' :
                  'none'
              }`,
              marginTop: '12px',
            }}
          >
            <p style={{color: 'gray', fontSize: '13px'}}>{e.name}</p>
            <p style={{fontSize: '13px', color: 'black'}}>{e.val}</p>
          </Row>
        );
      })}
    </Card>
  );
};
export default Item;
