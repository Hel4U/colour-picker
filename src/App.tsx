import { useEffect, useRef, useState } from "react";

function App() {
  const [color, setColor] = useState<string>("#000");
  const colorRef = useRef<HTMLInputElement>(null);
  const [colorName, setColorName] = useState<string>("black");

  useEffect(() => {
    const findColor = async () => {
      const resp = await fetch(
        `https://api.color.pizza/v1/?values=${color.substring(
          1,
          color.length,
        )}`,
      );
      const data: {
        paletteTitle: string;
      } = await resp.json();

      if (resp.ok) {
        setColorName(data.paletteTitle);
      }
    };

    findColor();
  }, [color]);

  const handleColorChange = () => {
    if (colorRef.current) {
      setColor(colorRef.current.value);
    }
  };

  return (
    <>
      <div>
        <header className='h-16 bg-fuchsia-500 text-white flex justify-center items-center text-xl'>
          <h1>Color Picker</h1>
        </header>
        <main className='h-full flex-col flex justify-center items-center'>
          <div>
            <input
              ref={colorRef}
              onChange={handleColorChange}
              defaultValue='black'
              type='color'
              name='color-picker'
              id='color-picker'
            />
          </div>
          <p>
            The color name is <span>{colorName}</span>
          </p>
        </main>
      </div>
    </>
  );
}

export default App;
