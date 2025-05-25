'use client';
import {useRouter} from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-4">
      <h1 className="text-3xl font-bold mb-4">Страница не найдена</h1>
      <p className="mb-6">Кажется, такой страницы не существует. Если вы уверены, что адрес указан верно, обратитесь
        в поддержку.</p>
      <button onClick={() => router.back()} className="button-2">
        Вернуться назад
      </button>
    </div>
  );
}