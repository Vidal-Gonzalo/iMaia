import { tags } from "./Tags";

export const postInputs = [
  {
    type: "text",
    label: "Título",
    name: "title",
    required: true,
  },
  {
    type: "text",
    label: "Descripción general",
    name: "overview",
    required: true,
  },
  {
    type: "select",
    label: "Género",
    name: "genre",
    options: [
      {
        label: "Poema",
        value: "poems",
      },
      { label: "Escrito", value: "writings" },
    ],
    required: true,
  },
  {
    type: "select",
    label: "Etiquetas",
    name: "writing_tags",
    options: tags[0].tag.map((value) => ({
      label: value,
      value: value,
    })),
  },
  {
    type: "select",
    label: "Etiquetas",
    name: "poem_tags",
    options: tags[1].tag.map((value) => ({
      label: value,
      value: value,
    })),
  },
];
