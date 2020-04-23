import React from 'react';
function useEffectAsync(effect, inputs) {
    React.useEffect(() => {
        effect();
    }, inputs);
}
export default useEffectAsync