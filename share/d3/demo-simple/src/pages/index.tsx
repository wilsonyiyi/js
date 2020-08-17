import React, { useEffect } from 'react';
import styles from './index.less';
import * as d3 from 'd3';

export default () => {
  useEffect(() => {
    d3.select('body')
      .append('svg')
      .attr('width', 1440)
      .attr('height', 30)
      .append('g')
      .attr('transform', 'translate(0,30)');
  }, []);
  return <div></div>;
};
