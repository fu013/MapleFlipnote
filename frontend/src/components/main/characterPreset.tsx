// CharacterPreset.tsx
import { getImgURL } from "lib/getImgURL";
import { useState } from "react";
import { CharacterData } from "services/interfaces/char.interface";
import {
  PresetAdd,
  PresetBox,
  PresetDelBtn,
  PresetTitle,
  PresetContainer,
  PresetCharacterName,
  CharacterCard,
  CharacterName,
  CharacterLevel,
  PresetItem,
  CharacterContainer,
  CharacterImage,
  PresetAddInput,
  PresetAddBtn,
} from "./presetStyle";
import { useFetchChar } from "services/react-query/character.query";
import { useChar_h } from "services/hooks/char.hook";

const CharacterPreset = () => {
  const { char, char_isLoading } = useFetchChar();
  const [characterName, setCharacterName] = useState("");
  const [activeItem, setActiveItem] = useState(0);
  const useCharH = useChar_h();
  const updateCharMutation = useCharH.useUpdateChar();
  const deleteCharMutation = useCharH.useDeleteChar();

  const handleSetChar = async () => {
    await updateCharMutation.mutateAsync(characterName);
  };

  const handleDelChar = async (targetCharacterName: string) => {
    await deleteCharMutation.mutateAsync(targetCharacterName);
  };

  const handleItemClick = (index: number) => {
    setActiveItem(index);
  };

  return (
    <CharacterContainer>
      <CharacterCard>
        <CharacterImage src={char[activeItem]?.chImage || getImgURL("default.png")} alt="character Profile Image" />
        <CharacterName>{char[activeItem]?.chName || "미생성"}</CharacterName>
        <CharacterLevel>{char[activeItem]?.chLevel || "Lv. 1"} </CharacterLevel>
      </CharacterCard>
      <PresetContainer>
        <PresetAdd>
          <PresetAddInput
            type="text"
            placeholder="캐릭터 명"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
          />
          <PresetAddBtn type="button" onClick={() => handleSetChar()}>
            ⬇
          </PresetAddBtn>
        </PresetAdd>
        <PresetBox>
          {char.map((item: CharacterData, index: number) => (
            <PresetItem
              key={item.chName}
              className={activeItem === index ? "active" : ""}
            >
              <PresetTitle
                onClick={() => handleItemClick(index)}>
                {item.chLevel}
                <PresetCharacterName>{item.chName}</PresetCharacterName>
              </PresetTitle>
              <PresetDelBtn onClick={() => handleDelChar(item.chName)}>제거</PresetDelBtn>
            </PresetItem>
          ))}
        </PresetBox>
      </PresetContainer>
    </CharacterContainer>
  );
};

export default CharacterPreset;
