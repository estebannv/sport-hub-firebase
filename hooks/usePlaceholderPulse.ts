import { useEffect } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';

export interface UsePlaceholderPulseOptions {
  /** Opacidad mínima (0–1). Default: 0.4 */
  minOpacity?: number;
  /** Opacidad máxima (0–1). Default: 0.8 */
  maxOpacity?: number;
  /** Duración de cada ciclo en ms. Default: 800 */
  duration?: number;
}

const DEFAULT_OPTIONS: Required<UsePlaceholderPulseOptions> = {
  minOpacity: 0.4,
  maxOpacity: 0.8,
  duration: 800,
};

/**
 * Hook que devuelve un estilo animado de opacidad pulsante para placeholders/skeletons.
 * Útil para estados de carga en listas, cards, etc.
 */
export const usePlaceholderPulse = (
  options: UsePlaceholderPulseOptions = {}
) => {
  const { minOpacity, maxOpacity, duration } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const opacity = useSharedValue(minOpacity);

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(maxOpacity, { duration }),
      -1,
      true
    );
  }, [opacity, maxOpacity, duration]);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
};

/**
 * Versión que recibe un SharedValue externo para sincronizar varios elementos
 * con el mismo pulso (opcional, para casos avanzados).
 */
export const usePlaceholderPulseWithSharedValue = (
  opacity: SharedValue<number>,
  options: UsePlaceholderPulseOptions = {}
) => {
  const { minOpacity, maxOpacity, duration } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(maxOpacity, { duration }),
      -1,
      true
    );
  }, [opacity, maxOpacity, duration]);

  return useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
};
