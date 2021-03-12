import * as React from 'react';
import ReactLoading from 'react-loading';

/** TODO:
 * [ ] Refactor to Material UI
 */
export const Loader: React.FC = () => <ReactLoading type="spokes" width={100} height={250} color="black" />;