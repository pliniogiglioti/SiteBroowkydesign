export type ProjectFile = {
  name: string
  path: string
  type: 'image' | 'pdf' | 'text' | 'file'
  cover?: string
}

export type ServiceProject = {
  title: string
  category: string
  modal: 'pdf' | 'image' | 'files'
  image?: string
  coverPdf?: ProjectFile
  folder: string
  files: ProjectFile[]
}

export const serviceWorks: ServiceProject[][] = [
  [],
  [],
  [
    {
      "title": "data logistica",
      "category": "Identidade_visual",
      "modal": "pdf",
      "coverPdf": {
        "name": "Manual de identidade Visual Data Logística compressed",
        "path": "/servicos/Identidade_visual/data_logistica/Manual_de_identidade_Visual_Data_Logística_compressed.pdf",
        "type": "pdf"
      },
      "folder": "/servicos/Identidade_visual/data_logistica",
      "files": [
        {
          "name": "Manual de identidade Visual Data Logística compressed",
          "path": "/servicos/Identidade_visual/data_logistica/Manual_de_identidade_Visual_Data_Logística_compressed.pdf",
          "type": "pdf"
        }
      ]
    },
    {
      "title": "destilus",
      "category": "Identidade_visual",
      "modal": "pdf",
      "image": "/servicos/Identidade_visual/destilus/capa.webp",
      "folder": "/servicos/Identidade_visual/destilus",
      "files": [
        {
          "name": "Manual de Marca Destilus compressed",
          "path": "/servicos/Identidade_visual/destilus/Manual_de_Marca_Destilus_compressed.pdf",
          "type": "pdf"
        }
      ]
    },
    {
      "title": "pingo",
      "category": "Identidade_visual",
      "modal": "pdf",
      "coverPdf": {
        "name": "Manual de Marca Pingo compressed",
        "path": "/servicos/Identidade_visual/pingo/Manual_de_Marca_Pingo_compressed.pdf",
        "type": "pdf"
      },
      "folder": "/servicos/Identidade_visual/pingo",
      "files": [
        {
          "name": "Manual de Marca Pingo compressed",
          "path": "/servicos/Identidade_visual/pingo/Manual_de_Marca_Pingo_compressed.pdf",
          "type": "pdf"
        }
      ]
    },
    {
      "title": "supramax",
      "category": "Identidade_visual",
      "modal": "pdf",
      "coverPdf": {
        "name": "Manual de Marca SUPRAMAX compressed",
        "path": "/servicos/Identidade_visual/supramax/Manual_de_Marca_SUPRAMAX_compressed.pdf",
        "type": "pdf"
      },
      "folder": "/servicos/Identidade_visual/supramax",
      "files": [
        {
          "name": "Manual de Marca SUPRAMAX compressed",
          "path": "/servicos/Identidade_visual/supramax/Manual_de_Marca_SUPRAMAX_compressed.pdf",
          "type": "pdf"
        }
      ]
    }
  ],
  [
    {
      "title": "Boots Horse",
      "category": "Catálogos",
      "modal": "pdf",
      "image": "/servicos/catalogos/boots_horse/capa.webp",
      "folder": "/servicos/catalogos/boots_horse",
      "files": [
        {
          "name": "pdf 01 compressed",
          "path": "/servicos/catalogos/boots_horse/pdf_01_compressed.pdf",
          "type": "pdf"
        },
        {
          "name": "pdf 02 compressed",
          "path": "/servicos/catalogos/boots_horse/pdf_02_compressed.pdf",
          "type": "pdf"
        },
        {
          "name": "pdf 03 compressed",
          "path": "/servicos/catalogos/boots_horse/pdf_03_compressed.pdf",
          "type": "pdf"
        },
        {
          "name": "pdf 04 compressed",
          "path": "/servicos/catalogos/boots_horse/pdf_04_compressed.pdf",
          "type": "pdf"
        },
        {
          "name": "pdf 05 compressed",
          "path": "/servicos/catalogos/boots_horse/pdf_05_compressed.pdf",
          "type": "pdf"
        },
        {
          "name": "pdf 06 compressed",
          "path": "/servicos/catalogos/boots_horse/pdf_06_compressed.pdf",
          "type": "pdf"
        },
        {
          "name": "pdf 07 compressed",
          "path": "/servicos/catalogos/boots_horse/pdf_07_compressed.pdf",
          "type": "pdf"
        },
        {
          "name": "pdf 08 compressed",
          "path": "/servicos/catalogos/boots_horse/pdf_08_compressed.pdf",
          "type": "pdf"
        },
        {
          "name": "pdf 09 compressed",
          "path": "/servicos/catalogos/boots_horse/pdf_09_compressed.pdf",
          "type": "pdf"
        }
      ]
    },
    {
      "title": "Tomahawk Collection",
      "category": "Catálogos",
      "modal": "pdf",
      "image": "/servicos/catalogos/collection/capa.webp",
      "folder": "/servicos/catalogos/collection",
      "files": [
        {
          "name": "pdf 01",
          "path": "/servicos/catalogos/collection/pdf_01.pdf",
          "type": "pdf"
        },
        {
          "name": "pdf 02",
          "path": "/servicos/catalogos/collection/pdf_02.pdf",
          "type": "pdf"
        },
        {
          "name": "pdf 03",
          "path": "/servicos/catalogos/collection/pdf_03.pdf",
          "type": "pdf"
        },
        {
          "name": "pdf 04",
          "path": "/servicos/catalogos/collection/pdf_04.pdf",
          "type": "pdf"
        },
        {
          "name": "pdf 05",
          "path": "/servicos/catalogos/collection/pdf_05.pdf",
          "type": "pdf"
        },
        {
          "name": "pdf 06",
          "path": "/servicos/catalogos/collection/pdf_06.pdf",
          "type": "pdf"
        },
        {
          "name": "pdf 07",
          "path": "/servicos/catalogos/collection/pdf_07.pdf",
          "type": "pdf"
        },
        {
          "name": "pdf 08",
          "path": "/servicos/catalogos/collection/pdf_08.pdf",
          "type": "pdf"
        },
        {
          "name": "pdf 09",
          "path": "/servicos/catalogos/collection/pdf_09.pdf",
          "type": "pdf"
        }
      ]
    },
    {
      "title": "American Country",
      "category": "Catálogos",
      "modal": "pdf",
      "image": "/servicos/catalogos/american_courntry/capa.webp",
      "folder": "/servicos/catalogos/american_courntry",
      "files": [
        {
          "name": "pdf 01",
          "path": "/servicos/catalogos/american_courntry/pdf_01.pdf",
          "type": "pdf"
        },
        {
          "name": "pdf 02",
          "path": "/servicos/catalogos/american_courntry/pdf_02.pdf",
          "type": "pdf"
        },
        {
          "name": "pdf 03",
          "path": "/servicos/catalogos/american_courntry/pdf_03.pdf",
          "type": "pdf"
        }
      ]
    },
    {
      "title": "Tomahawk Outdoor",
      "category": "Catálogos",
      "modal": "pdf",
      "image": "/servicos/catalogos/outdoor/capa.webp",
      "folder": "/servicos/catalogos/outdoor",
      "files": [
        {
          "name": "pdf 01",
          "path": "/servicos/catalogos/outdoor/pdf_01.pdf",
          "type": "pdf"
        },
        {
          "name": "pdf 02",
          "path": "/servicos/catalogos/outdoor/pdf_02.pdf",
          "type": "pdf"
        },
        {
          "name": "pdf 03",
          "path": "/servicos/catalogos/outdoor/pdf_03.pdf",
          "type": "pdf"
        }
      ]
    },
    {
      "title": "Seleção Nacional",
      "category": "Catálogos",
      "modal": "pdf",
      "image": "/servicos/catalogos/selecao_nacional/capa.webp",
      "folder": "/servicos/catalogos/selecao_nacional",
      "files": [
        {
          "name": "pdf 01",
          "path": "/servicos/catalogos/selecao_nacional/pdf_01.pdf",
          "type": "pdf"
        }
      ]
    },
    {
      "title": "Tomahawk Ropes",
      "category": "Catálogos",
      "modal": "pdf",
      "image": "/servicos/catalogos/tomahawk_ropes/capa.webp",
      "folder": "/servicos/catalogos/tomahawk_ropes",
      "files": [
        {
          "name": "pdf 01",
          "path": "/servicos/catalogos/tomahawk_ropes/pdf_01.pdf",
          "type": "pdf"
        },
        {
          "name": "pdf 02",
          "path": "/servicos/catalogos/tomahawk_ropes/pdf_02.pdf",
          "type": "pdf"
        }
      ]
    }
  ]
]
