import { Alert, Platform } from "react-native";

class AleartService {
    howMessage(title: string, msg?: string, onOk?: () => void) {
        if (Platform.OS === 'web' && typeof window !== 'undefined' && window.alert) {
            window.alert(`${title}\n\n${msg ?? ''}`);
            if (onOk) onOk();
        } else {
            Alert.alert(title, msg ?? '');
        }
    };
};

export default new AleartService();