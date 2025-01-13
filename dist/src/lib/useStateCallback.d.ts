declare function useStateCallback<T>(initialState: T): [T, (state: T, cb?: (state: T) => void) => void];
export default useStateCallback;
