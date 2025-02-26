'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface KakaoContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  kakao: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setKakao: Dispatch<SetStateAction<any>>;
}

const KakaoContext = createContext<KakaoContextType | null>(null);

export const KakaoProvider = ({ children }: { children: ReactNode }) => {
  const [kakao, setKakao] = useState(null);

  return (
    <KakaoContext.Provider value={{ kakao, setKakao }}>
      {children}
    </KakaoContext.Provider>
  );
};

export const useKakao = () => {
  const context = useContext(KakaoContext);
  if (!context) throw new Error('Kakao Provider안에서만 사용해주세요');
  return context;
};
