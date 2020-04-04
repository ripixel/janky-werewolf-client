import * as React from 'react';

import connector, { IPropsFromState } from './connector';

import styles from './styles.scss';

export type TProps = IPropsFromState & {
  compiler: string;
  framework: string;
};

export const Hello = (props: TProps): JSX.Element => (
  <React.Fragment>
    <h1 className={styles.helloTitle}>
      Hello from {props.compiler} and {props.framework}!
    </h1>
    <p>
      You are using the {process.env.NODE_ENV} environment, and a sample
      variable taken from a .env file is {process.env.ENV_VALUE}
    </p>
    <p>Your user Id is {props.userId}</p>
  </React.Fragment>
);

export default connector(Hello);
