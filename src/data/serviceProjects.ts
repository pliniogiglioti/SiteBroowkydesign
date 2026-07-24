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
  url?: string
  logo?: string
  domain?: string
  description?: string
  image?: string
  coverPdf?: ProjectFile
  folder: string
  files: ProjectFile[]
}

export const serviceWorks: ServiceProject[][] = [
  [
    {
      "title": "Boots Horse — Plataforma Digital",
      "category": "Design de Produto",
      "modal": "files",
      "url": "https://bootshorse.com.br",
      "logo": "/logos/boots-horse.svg",
      "domain": "bootshorse.com.br",
      "description": "Projeto digital pensado como produto: arquitetura da oferta, organização do catálogo e jornadas que conectam descoberta, confiança e conversão para clientes e revendedores.",
      "image": "/servicos/design_de_produto/boots_horse_site/capa.png",
      "folder": "/servicos/design_de_produto/boots_horse_site",
      "files": [
        {
          "name": "00 prancha sistema visual",
          "path": "/servicos/design_de_produto/boots_horse_site/00-prancha-sistema-visual.png",
          "type": "image"
        },
        {
          "name": "01 fundamentos paleta",
          "path": "/servicos/design_de_produto/boots_horse_site/01-fundamentos-paleta.webp",
          "type": "image"
        },
        {
          "name": "02 fundamentos tipografia",
          "path": "/servicos/design_de_produto/boots_horse_site/02-fundamentos-tipografia.webp",
          "type": "image"
        },
        {
          "name": "03 interface principal",
          "path": "/servicos/design_de_produto/boots_horse_site/03-interface-principal.webp",
          "type": "image"
        },
        {
          "name": "04 componentes raios",
          "path": "/servicos/design_de_produto/boots_horse_site/04-componentes-raios.webp",
          "type": "image"
        },
        {
          "name": "05 aplicacao home",
          "path": "/servicos/design_de_produto/boots_horse_site/05-aplicacao-home.png",
          "type": "image"
        },
        {
          "name": "05 componentes navegacao",
          "path": "/servicos/design_de_produto/boots_horse_site/05-componentes-navegacao.webp",
          "type": "image"
        },
        {
          "name": "06 aplicacao mobile",
          "path": "/servicos/design_de_produto/boots_horse_site/06-aplicacao-mobile.png",
          "type": "image"
        },
        {
          "name": "06 grid aplicacoes",
          "path": "/servicos/design_de_produto/boots_horse_site/06-grid-aplicacoes.webp",
          "type": "image"
        },
        {
          "name": "07 aplicacao mobile comercial",
          "path": "/servicos/design_de_produto/boots_horse_site/07-aplicacao-mobile-comercial.png",
          "type": "image"
        },
        {
          "name": "08 aplicacao comercial",
          "path": "/servicos/design_de_produto/boots_horse_site/08-aplicacao-comercial.png",
          "type": "image"
        }
      ]
    },
    {
      "title": "Tomahawk Collection — Plataforma de Marca",
      "category": "Design de Produto",
      "modal": "files",
      "url": "https://tomahawkcollection.com.br",
      "logo": "/logos/tomahawk-collection.svg",
      "domain": "tomahawkcollection.com.br",
      "description": "Produto digital criado para posicionar a marca, apresentar suas coleções e estruturar a jornada comercial de novos revendedores com clareza, desejo e percepção de valor.",
      "image": "/servicos/design_de_produto/tomahawk_collection_site/capa.png",
      "folder": "/servicos/design_de_produto/tomahawk_collection_site",
      "files": [
        {
          "name": "00 prancha sistema visual",
          "path": "/servicos/design_de_produto/tomahawk_collection_site/00-prancha-sistema-visual.png",
          "type": "image"
        },
        {
          "name": "01 fundamentos identidade",
          "path": "/servicos/design_de_produto/tomahawk_collection_site/01-fundamentos-identidade.webp",
          "type": "image"
        },
        {
          "name": "02 fundamentos tipografia",
          "path": "/servicos/design_de_produto/tomahawk_collection_site/02-fundamentos-tipografia.webp",
          "type": "image"
        },
        {
          "name": "03 interface principal",
          "path": "/servicos/design_de_produto/tomahawk_collection_site/03-interface-principal.webp",
          "type": "image"
        },
        {
          "name": "04 componentes paleta",
          "path": "/servicos/design_de_produto/tomahawk_collection_site/04-componentes-paleta.webp",
          "type": "image"
        },
        {
          "name": "05 aplicacao home",
          "path": "/servicos/design_de_produto/tomahawk_collection_site/05-aplicacao-home.png",
          "type": "image"
        },
        {
          "name": "05 componentes grid",
          "path": "/servicos/design_de_produto/tomahawk_collection_site/05-componentes-grid.webp",
          "type": "image"
        },
        {
          "name": "06 aplicacao mobile",
          "path": "/servicos/design_de_produto/tomahawk_collection_site/06-aplicacao-mobile.png",
          "type": "image"
        },
        {
          "name": "06 navegacao aplicada",
          "path": "/servicos/design_de_produto/tomahawk_collection_site/06-navegacao-aplicada.webp",
          "type": "image"
        },
        {
          "name": "07 aplicacao mobile comercial",
          "path": "/servicos/design_de_produto/tomahawk_collection_site/07-aplicacao-mobile-comercial.png",
          "type": "image"
        },
        {
          "name": "08 aplicacao comercial",
          "path": "/servicos/design_de_produto/tomahawk_collection_site/08-aplicacao-comercial.png",
          "type": "image"
        }
      ]
    }
  ],
  [
    {
      "title": "Boots Horse — Experiência E-commerce",
      "category": "UI/UX Design",
      "modal": "files",
      "url": "https://bootshorse.com.br",
      "logo": "/logos/boots-horse.svg",
      "domain": "bootshorse.com.br",
      "description": "Experiência responsiva criada no Figma, com hierarquia visual clara, navegação intuitiva e pontos de ação pensados para facilitar a descoberta dos produtos e o contato comercial.",
      "image": "/servicos/ui_ux_design/boots_horse_site/capa.png",
      "folder": "/servicos/ui_ux_design/boots_horse_site",
      "files": [
        {
          "name": "01 home desktop",
          "path": "/servicos/ui_ux_design/boots_horse_site/01-home-desktop.png",
          "type": "image"
        },
        {
          "name": "02 home mobile",
          "path": "/servicos/ui_ux_design/boots_horse_site/02-home-mobile.png",
          "type": "image"
        },
        {
          "name": "02b mobile conversao",
          "path": "/servicos/ui_ux_design/boots_horse_site/02b-mobile-conversao.png",
          "type": "image"
        },
        {
          "name": "03 jornada revendedor",
          "path": "/servicos/ui_ux_design/boots_horse_site/03-jornada-revendedor.png",
          "type": "image"
        },
        {
          "name": "04 historia marca",
          "path": "/servicos/ui_ux_design/boots_horse_site/04-historia-marca.png",
          "type": "image"
        }
      ]
    },
    {
      "title": "Tomahawk Collection — Experiência Digital",
      "category": "UI/UX Design",
      "modal": "files",
      "url": "https://tomahawkcollection.com.br",
      "logo": "/logos/tomahawk-collection.svg",
      "domain": "tomahawkcollection.com.br",
      "description": "Interface responsiva concebida no Figma, combinando narrativa visual imersiva, navegação objetiva, hierarquia tipográfica e chamadas estratégicas para conduzir usuários e potenciais revendedores.",
      "image": "/servicos/ui_ux_design/tomahawk_collection_site/capa.png",
      "folder": "/servicos/ui_ux_design/tomahawk_collection_site",
      "files": [
        {
          "name": "01 home desktop",
          "path": "/servicos/ui_ux_design/tomahawk_collection_site/01-home-desktop.png",
          "type": "image"
        },
        {
          "name": "02 home mobile",
          "path": "/servicos/ui_ux_design/tomahawk_collection_site/02-home-mobile.png",
          "type": "image"
        },
        {
          "name": "02b mobile conversao",
          "path": "/servicos/ui_ux_design/tomahawk_collection_site/02b-mobile-conversao.png",
          "type": "image"
        },
        {
          "name": "03 experiencia produto",
          "path": "/servicos/ui_ux_design/tomahawk_collection_site/03-experiencia-produto.png",
          "type": "image"
        },
        {
          "name": "04 beneficios conversao",
          "path": "/servicos/ui_ux_design/tomahawk_collection_site/04-beneficios-conversao.png",
          "type": "image"
        }
      ]
    }
  ],
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
          "name": "pdf 01 compressed",
          "path": "/servicos/catalogos/outdoor/pdf_01_compressed.pdf",
          "type": "pdf"
        },
        {
          "name": "pdf 02 compressed",
          "path": "/servicos/catalogos/outdoor/pdf_02_compressed.pdf",
          "type": "pdf"
        },
        {
          "name": "pdf 03 compressed",
          "path": "/servicos/catalogos/outdoor/pdf_03_compressed.pdf",
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
