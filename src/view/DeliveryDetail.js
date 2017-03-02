import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {createForm} from 'rc-form';

import {Toast, NavBar, WhiteSpace, List, InputItem, Picker, Switch, Button} from 'antd-mobile';

import constant from '../util/constant';
import validate from '../util/validate';
import http from '../util/http';
import style from './style.css';

let delivery_province_city_area = [];

class DeliveryDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            delivery_province_city_area: [],
            china: [{
                "children": [{
                    "children": [{
                        "label": "东城区",
                        "value": "6c494c5b41024ba08f6b22ec2056427c"
                    }, {"label": "西城区", "value": "c633a4feff22426185c21ae9add80dac"}, {
                        "label": "崇文区",
                        "value": "c65267b501af424da1ee936a180b263d"
                    }, {"label": "宣武区", "value": "b5b28ed589b24a58bd8825b97703c141"}, {
                        "label": "朝阳区",
                        "value": "2b713b07ba8a41399b12d267c77213cd"
                    }, {"label": "丰台区", "value": "78bcad8c82d54d5b8e3cd2bf53ed6c7c"}, {
                        "label": "石景山区",
                        "value": "4f40f04dc12b4a6bb85e7dea087b35be"
                    }, {"label": "海淀区", "value": "75ec0e73750340538173291278ff4e2d"}, {
                        "label": "门头沟区",
                        "value": "be6d882106164462a7e875487ce847d9"
                    }, {"label": "房山区", "value": "be2b6fc8b15e4ccfb5489ad27274da17"}, {
                        "label": "通州区",
                        "value": "087d6d5f4c8942c3be165fc61b973346"
                    }, {"label": "顺义区", "value": "bfd9c079d6164e97933cdf614b9623a5"}, {
                        "label": "昌平区",
                        "value": "ab8f4e5fd17848cdbe44b0f6cfab54e5"
                    }, {"label": "大兴区", "value": "09438962d36e466bb4558d7bd487ce97"}, {
                        "label": "平谷区",
                        "value": "09f552ba800a48ca8d48ac2751c3ce66"
                    }, {"label": "怀柔区", "value": "96f4a7791a8546df8d96a66913460101"}, {
                        "label": "密云县",
                        "value": "fd2941b005cc4721a4f861e28569487e"
                    }, {"label": "延庆县", "value": "0cfcdde22e1643cb9b008ab036169304"}],
                    "label": "北京",
                    "value": "48ddbc96c19f47cb8fcd67ad6a7e2cbc"
                }], "label": "北京", "value": "014d793d0afd4460ae90c442a64fd207"
            }, {
                "children": [{
                    "children": [{
                        "label": "和平区",
                        "value": "e594a133720e44149acd8da0aa05a046"
                    }, {"label": "河东区", "value": "9e1d3ba85b9a47f79afb4cf59af4f577"}, {
                        "label": "河西区",
                        "value": "9cf743305acf4a568cbd7f330d733e52"
                    }, {"label": "南开区", "value": "786d252b4da84e5e8099b0c7286deae3"}, {
                        "label": "河北区",
                        "value": "dc71166233c14f178fee9907c6ca3ed2"
                    }, {"label": "红桥区", "value": "da524b8e324547d5893d4c29d0640d32"}, {
                        "label": "塘沽区",
                        "value": "017dc5211b9344708b37de6f33549893"
                    }, {"label": "汉沽区", "value": "dc6197bfa56743839993ed7049a5817d"}, {
                        "label": "大港区",
                        "value": "c8a7ee20757544cb848c4c9a7c8429cf"
                    }, {"label": "东丽区", "value": "3bbc6bbbe8224dd0ad73b714f82ad1bb"}, {
                        "label": "西青区",
                        "value": "3b99b4b536a342cb99c6a616176169a9"
                    }, {"label": "津南区", "value": "7cd4c697225846a0a6ed9388206d2e80"}, {
                        "label": "北辰区",
                        "value": "8ed34837b38342c4bdaa67fe50a21d7b"
                    }, {"label": "武清区", "value": "4a4f53dfbe8a488cb9311478a6b8dd3b"}, {
                        "label": "宝坻区",
                        "value": "2c1e1ae6112d47f19b75b1bd5f969bed"
                    }, {"label": "宁河县", "value": "a95d8b152d21418a90c50ed08c2aa009"}, {
                        "label": "静海县",
                        "value": "c16f09c0926d41c38d2c9562220a85ca"
                    }, {"label": "蓟  县", "value": "01d35b60c6a14ad398a4affdd7ae5b38"}],
                    "label": "天津",
                    "value": "c85fa945a5004356926b7e1e17d48b66"
                }], "label": "天津", "value": "414acaf1c1dd420e8423cd34fbca9337"
            }, {
                "children": [{
                    "children": [{
                        "label": "长安区",
                        "value": "8ff28c556ed9467cb9e89414511697a9"
                    }, {"label": "桥东区", "value": "34d4e23910d74058a32fa510ec9eeb8a"}, {
                        "label": "桥西区",
                        "value": "ac8ef576c3d9495cb5120e363b2670a9"
                    }, {"label": "新华区", "value": "b7562fb51afa4caf8a2b4b66c130c8b6"}, {
                        "label": "郊  区",
                        "value": "415351e930cf47c0b5981530a2604fec"
                    }, {"label": "井陉矿区", "value": "2f4d3dc9157b4c32a70a7f46357ace93"}, {
                        "label": "井陉县",
                        "value": "1753d23caa014b5ab8d60647455ee8e0"
                    }, {"label": "正定县", "value": "f167a5fe780142b8b343f3e010574187"}, {
                        "label": "栾城县",
                        "value": "f2a8ee1403e3456daa7cba8d893404eb"
                    }, {"label": "行唐县", "value": "fdba889b6e16418f9b758550d9e52712"}, {
                        "label": "灵寿县",
                        "value": "a813d8d9db784183b72cd03afa0bf06f"
                    }, {"label": "高邑县", "value": "22f3a7e6915e4df688aea0f7980dbba0"}, {
                        "label": "深泽县",
                        "value": "cff70432235840b5bd52c969250ea1e5"
                    }, {"label": "赞皇县", "value": "d61e2b27c5ac49c7b50fdb9d8e59af22"}, {
                        "label": "无极县",
                        "value": "76f61d04ad194b2e9e2ba844c105a9ea"
                    }, {"label": "平山县", "value": "f81b63c4be2e4116849f9e9077ba9f64"}, {
                        "label": "元氏县",
                        "value": "5f1b2edb59d24e70824ead5384c79cf2"
                    }, {"label": "赵  县", "value": "c86f923475a0407ba82eeac05708cf58"}, {
                        "label": "辛集市",
                        "value": "19da0122e3db4745837c60ec38a39764"
                    }, {"label": "藁", "value": "dfab7efbc1024908a3590398b9540542"}, {
                        "label": "晋州市",
                        "value": "cfb47d6da7a9460d93d5dcd9c0495395"
                    }, {"label": "新乐市", "value": "9e4408e9d9cb4212963e5e9e9c744976"}, {
                        "label": "鹿泉市",
                        "value": "5dbab5cb29f945abaf56b00976b2097f"
                    }], "label": "石家庄", "value": "d07db2666ab244568f1e38cb7f9f79c3"
                }, {
                    "children": [{"label": "路南区", "value": "849bacb7fe4f47b2b1ea0e4db25b2546"}, {
                        "label": "路北区",
                        "value": "cd30c064c2f142018fd223e651b31a65"
                    }, {"label": "古冶区", "value": "cd4e9c5011c34cb6b5e70e694682dcf4"}, {
                        "label": "开平区",
                        "value": "bda48b3805124c68a3f0a6890c6d8276"
                    }, {"label": "新  区", "value": "e2c819de701e4bd1bd99a55c25c5b900"}, {
                        "label": "丰润县",
                        "value": "0c72599a34fe46169010615b4381f027"
                    }, {"label": "滦  县", "value": "7ba452469e0a42bdbbc8101c44c60e36"}, {
                        "label": "滦南县",
                        "value": "b06400f03eb0409ca08523d03c9383cb"
                    }, {"label": "乐亭县", "value": "54db7abd674f42d28bcc7b1a8aebeb2c"}, {
                        "label": "迁西县",
                        "value": "592e9fa16ea047028ec5d4f300f7ed28"
                    }, {"label": "玉田县", "value": "efd83c0a1dc4483cbd9a8cd4ae91492a"}, {
                        "label": "唐海县",
                        "value": "a8c4705875294da38452f0ab1fcd2a78"
                    }, {"label": "遵化市", "value": "c526be573482477abc3880dccabbb080"}, {
                        "label": "丰南市",
                        "value": "c29977b0892f46519a3de2aeff59adb1"
                    }, {"label": "迁安市", "value": "6905b4f9119b47fd9eaf5f8a1e3b7859"}],
                    "label": "唐山",
                    "value": "7564fbdad36f49318d20b6e9a371bed1"
                }, {
                    "children": [{"label": "海港区", "value": "baff0aaa5bc344369443f82d7acca76a"}, {
                        "label": "山海关区",
                        "value": "cfd2cdb5d548497db9c5acad9aa8bc75"
                    }, {"label": "北戴河区", "value": "a955a5ebe065490ca1fcff122cfa9653"}, {
                        "label": "青龙满族自治县",
                        "value": "f73c5ef58e514d25b664882fe1f00b94"
                    }, {"label": "昌黎县", "value": "64e9e7c04fab4a73a9eb2a3e1e1860f9"}, {
                        "label": "抚宁县",
                        "value": "642c815a679c46faa4b56a160acd2cc4"
                    }, {"label": "卢龙县", "value": "df590f83c9394f07bb88ecffd698e365"}],
                    "label": "秦皇岛",
                    "value": "63135e2c77854762b68333e2ee30dccd"
                }, {
                    "children": [{"label": "邯山区", "value": "7b2c23851c3c4cfbaaed920dfee092f1"}, {
                        "label": "丛台区",
                        "value": "900499e7401d4d02bae51aa74d48891c"
                    }, {"label": "复兴区", "value": "c307df734f4f4493ba50e0a86e2a397f"}, {
                        "label": "峰峰矿区",
                        "value": "494c9a9317b74029b0bc4730a7650de0"
                    }, {"label": "邯郸县", "value": "5a845426b7a44eccade93c90e71a910f"}, {
                        "label": "临漳县",
                        "value": "354aee2357a94736ba659bd5f4d7b770"
                    }, {"label": "成安县", "value": "d8f8fbc41e2b46dcbc5f1040ce216f94"}, {
                        "label": "大名县",
                        "value": "444b7343712342d997e65fbd9387d3b5"
                    }, {"label": "涉  县", "value": "a5078623cc904c41a9aba54debbd5f98"}, {
                        "label": "磁  县",
                        "value": "2d503ba2b3d344c6897bc3a8ac6a3ccc"
                    }, {"label": "肥乡县", "value": "29e1c5a5539e46ed911ecfe015a81527"}, {
                        "label": "永年县",
                        "value": "60d23a41c5064dd1aa19051f8e967fd0"
                    }, {"label": "邱  县", "value": "67182ecbdc5b4264804a8e8f62aeaa73"}, {
                        "label": "鸡泽县",
                        "value": "b32e586624cf42dd904beda5dd3e10d1"
                    }, {"label": "广平县", "value": "b7f2e5c861d046958695043b749c17ef"}, {
                        "label": "馆陶县",
                        "value": "09dbe1ac167f432fa2a4d21452932e8a"
                    }, {"label": "魏  县", "value": "43a245a3ebfa4c91bc5de23deaa8cfb6"}, {
                        "label": "曲周县",
                        "value": "69aae3650d6e4445870fbd164ea29b4d"
                    }, {"label": "武安市", "value": "54d5d50d87114bbfab825cd2b5de464f"}],
                    "label": "邯郸",
                    "value": "dd010a73d15740e0af711cfe9b199588"
                }, {
                    "children": [{"label": "桥东区", "value": "cb0c8ae9fee74d0cbed7c0aea70f55d1"}, {
                        "label": "桥西区",
                        "value": "f61eb190d1aa4d8ab464129be754d464"
                    }, {"label": "邢台县", "value": "5bfded4b3f954035972788d0e3b671d5"}, {
                        "label": "临城县",
                        "value": "336bba666a6f42b1a45335bf768ed9af"
                    }, {"label": "内丘县", "value": "cf233e36801a483b9a1b38d3428b277c"}, {
                        "label": "柏乡县",
                        "value": "e805c00bc75345c985851dff77c3a38a"
                    }, {"label": "隆尧县", "value": "fc772ca944c74b9c8ef5077103e064e4"}, {
                        "label": "任  县",
                        "value": "3be994f1548049f180b7bb8c435de69e"
                    }, {"label": "南和县", "value": "9a598b81364c43c0b5736092e7fddbec"}, {
                        "label": "宁晋县",
                        "value": "96e1018a6cf44d389cc077c4165c8e47"
                    }, {"label": "巨鹿县", "value": "d78c90ca4378401cbc221cd67e14b446"}, {
                        "label": "新河县",
                        "value": "14a357f4d59c4bf0aafde02c68aa4083"
                    }, {"label": "广宗县", "value": "cd5e3cc7ec6740118dbd473e8ba19329"}, {
                        "label": "平乡县",
                        "value": "dcebeafacfaf47ddb5608318cada9e0b"
                    }, {"label": "威  县", "value": "a1f8170fa7f64a17b2a800627141bf7c"}, {
                        "label": "清河县",
                        "value": "f69b8536c7a94d63b16fa6fd4a9e1579"
                    }, {"label": "临西县", "value": "ebaf71784a364744b6433b9a9657b30b"}, {
                        "label": "南宫市",
                        "value": "4f3d4adbe62e4beab1d26ce2b3765f65"
                    }, {"label": "沙河市", "value": "394e553a544d4298870e644c8abe7c29"}],
                    "label": "邢台",
                    "value": "457153708bf84de491a8c67c97ab6030"
                }, {
                    "children": [{"label": "新市区", "value": "47764963b951450589639867891768c5"}, {
                        "label": "北市区",
                        "value": "087588db727c4fbc80720fb5b59a3af8"
                    }, {"label": "南市区", "value": "0354544ada344a68b04b7e5fb9a3acc6"}, {
                        "label": "满城县",
                        "value": "26ef79264c68422091da3d40edec62a4"
                    }, {"label": "清苑县", "value": "228e950c548941b8b86a0c562df8ba5c"}, {
                        "label": "涞水县",
                        "value": "16e5ec3b81e441f99f1ea9cec77199c2"
                    }, {"label": "阜平县", "value": "ebbb8bf94296437b892112cd4544b28f"}, {
                        "label": "徐水县",
                        "value": "ea85b0e2ef36496cb5768734d379f9c7"
                    }, {"label": "定兴县", "value": "0ca5548f0c22407f92b087c11612a8ac"}, {
                        "label": "唐  县",
                        "value": "6a87c69edf25470b900a36b16a52423d"
                    }, {"label": "高阳县", "value": "ed9334a92cb348eb86eb2b2ab572dc75"}, {
                        "label": "容城县",
                        "value": "b4decc9296a447e09cf6d71d5a51c6a1"
                    }, {"label": "涞源县", "value": "063b969b46b64d728057dc5fb5b8d85a"}, {
                        "label": "望都县",
                        "value": "ce0dff1574f14649826c6b0468644ad2"
                    }, {"label": "安新县", "value": "a7603fa3efdd4d9facf135b15f00eb69"}, {
                        "label": "易  县",
                        "value": "2c393a725f2f4d9a8e698d158e24190d"
                    }, {"label": "曲阳县", "value": "933239914ecb4ab39c06e496e25f44f1"}, {
                        "label": "蠡  县",
                        "value": "a04eb1f57608409facc5039baa7a0c78"
                    }, {"label": "顺平县", "value": "1ef20d33915a4081b846d90fedba49a5"}, {
                        "label": "博野",
                        "value": "59d3649ddf73458fbd6b322e1141d37e"
                    }, {"label": "雄县", "value": "b6f647734ea94291850320d147df1f61"}, {
                        "label": "涿州市",
                        "value": "09af2560e8f040c3974086085fb8a95e"
                    }, {"label": "定州市", "value": "d7ecebbff4cd4daab2310ce0af675e95"}, {
                        "label": "安国市",
                        "value": "b72b75c0d6f34769aceb60582f0e1f66"
                    }, {"label": "高碑店市", "value": "384446fb32424c44a87313ed81df564e"}],
                    "label": "保定",
                    "value": "a11be979d34d475dbfd0796dbc692171"
                }, {
                    "children": [{"label": "桥东区", "value": "e5e6229e6e9245e988f3015737c03665"}, {
                        "label": "桥西区",
                        "value": "851cfe2ff71a41a3976d94e4a897d0d9"
                    }, {"label": "宣化区", "value": "d70cab5cd7404dc182278f802394ffb6"}, {
                        "label": "下花园区",
                        "value": "72b01e4877be47149c8b3b4e9ba49a75"
                    }, {"label": "宣化县", "value": "a5c6e1ba273f450c91b21a5cc092088b"}, {
                        "label": "张北县",
                        "value": "44ba439bd6774a96a9ebfa8e6c18eb8d"
                    }, {"label": "康保县", "value": "85b2cf973d334731a021f7a44d42449b"}, {
                        "label": "沽源县",
                        "value": "4b56997facaf40829da666b2815594a1"
                    }, {"label": "尚义县", "value": "12f80a05ea7a4a8c89dec5867b37ced5"}, {
                        "label": "蔚  县",
                        "value": "2a0c66fea33547a4bdf828b5c2dcb981"
                    }, {"label": "阳原县", "value": "b896639998e3449d819feca3310c5e02"}, {
                        "label": "怀安县",
                        "value": "6bb0797ee1be48e194359cb1829eb3e7"
                    }, {"label": "万全县", "value": "179466a8689746da889b69cf471184fb"}, {
                        "label": "怀来县",
                        "value": "c52349400b4f4d29adc1a7fd79a91cf6"
                    }, {"label": "涿鹿县", "value": "ee1ded86495d435aa77717a3cf8dadef"}, {
                        "label": "赤城县",
                        "value": "69c6f576e0134207af18fef2d78548e7"
                    }, {"label": "崇礼县", "value": "68e72cbf62be47a3b1a37c56f5ba229d"}],
                    "label": "张家口",
                    "value": "08f110d5108c4a25a2f00789b97f5244"
                }, {
                    "children": [{"label": "双桥区", "value": "a2ba971281504b6ea08056a7325f50ad"}, {
                        "label": "双滦区",
                        "value": "51b589e5a51a4713b3392b8f39fc099e"
                    }, {"label": "鹰手营子矿区", "value": "d266f751d88245f3a503ed16d2a14fb3"}, {
                        "label": "承德县",
                        "value": "0343ab78eda54d5182ce7b39839118a3"
                    }, {"label": "兴隆县", "value": "5f327f19f65d4a699de5932f9fb13f48"}, {
                        "label": "平泉县",
                        "value": "6c87864efca848e383edf53650a86376"
                    }, {"label": "滦平县", "value": "7a5d27d1c5544c4fb575c6459ac98a2a"}, {
                        "label": "隆化县",
                        "value": "5ff0ed4cf4f746cd8d55b97d87421c81"
                    }, {"label": "丰宁满族自治县", "value": "8f7c0800859f4215afc29b53fce8ff11"}, {
                        "label": "宽城满族自治县",
                        "value": "594209e5172b47d78022a986167719a4"
                    }, {"label": "围场满族蒙古族自治县", "value": "ca627d055a774f8590494ed64773c328"}],
                    "label": "承德",
                    "value": "38f4cca8b58542eba0666714d6830517"
                }, {
                    "children": [{"label": "新华区", "value": "f396a360e456448087a8aeda258a84ac"}, {
                        "label": "运河区",
                        "value": "f967e1663b3942bfa69a92865ab6e893"
                    }, {"label": "沧  县", "value": "dd9813f9eda149ad99b6734a640d92f9"}, {
                        "label": "青  县",
                        "value": "188f83e5f42344768a7a40de7c6e18ff"
                    }, {"label": "东光县", "value": "34d790e00bcb422994282b9a59c099fd"}, {
                        "label": "海兴县",
                        "value": "14587f0af1194a4f9bf72e7a32843ad3"
                    }, {"label": "盐山县", "value": "e5ed4c9982124caa91c26dd29571cb47"}, {
                        "label": "肃宁县",
                        "value": "5eef7d1a560f4ce9a3cdbc8cda8caf0a"
                    }, {"label": "南皮县", "value": "d34708398d6544eabb0473ad73e4c15e"}, {
                        "label": "吴桥县",
                        "value": "3763ce85933642769127d401c80daa77"
                    }, {"label": "献  县", "value": "f1323dcc9f2248fda0c0b74af666bb50"}, {
                        "label": "孟村回族自治县",
                        "value": "f69637a038464f828db0bb4b2ebe411c"
                    }, {"label": "泊头市", "value": "af0bfc9596bd4143bd0427909bce0669"}, {
                        "label": "任丘市",
                        "value": "85d22259d465416e81f55e07938dcb32"
                    }, {"label": "黄骅市", "value": "1b7a5dd6151c4a64b4c21dc5bfd6a6fc"}, {
                        "label": "河间市",
                        "value": "b4cb6eee0a90494a8b71cb7958c4f796"
                    }], "label": "沧州", "value": "d904a8a546e045ef8788f462873a6e02"
                }, {
                    "children": [{"label": "安次区", "value": "8e92130ebb98439e8de95e9fd5115ee7"}, {
                        "label": "固安县",
                        "value": "ad6323a17c3242a89aa5d2b67ce9f3a9"
                    }, {"label": "永清县", "value": "8228f6dd21554258a95eb4bc2e85e0ce"}, {
                        "label": "香河县",
                        "value": "9103bda455a54c719428fc6a7daef8a4"
                    }, {"label": "大城县", "value": "8a80f2e8218842f7aa54ee958b5723fc"}, {
                        "label": "文安县",
                        "value": "6dd5ad6df5fb4d14988e30522335b6d7"
                    }, {"label": "大厂回族自治县", "value": "02a29ca23d014ad2a07af28e5af2f4b4"}, {
                        "label": "霸州市",
                        "value": "c9236199b93c45e790860ad7d14243c4"
                    }, {"label": "三河市", "value": "fb1eafa92b604356990b4e21397bfbc2"}],
                    "label": "廊坊",
                    "value": "19fcf707f98a419aa96824abdc44bd12"
                }, {
                    "children": [{"label": "桃城区", "value": "5a88f18d1f5546738a0b11712fff6588"}, {
                        "label": "枣强县",
                        "value": "cb18f20ad9d14c7999503e1fa3912e27"
                    }, {"label": "武邑县", "value": "df67a6c7c2814cc6aa79dc9803f0ac4a"}, {
                        "label": "武强县",
                        "value": "e6c90b80dbb6479a8953ea7dfda6c8f0"
                    }, {"label": "饶阳县", "value": "23c8c5308c62451783af6569cfc68705"}, {
                        "label": "安平县",
                        "value": "b55bf88251184f99bda7b439335097b5"
                    }, {"label": "故城县", "value": "242473d2f26f4b90adb3f72567a969ed"}, {
                        "label": "景  县",
                        "value": "37d30967c57540488486c830d435ccc4"
                    }, {"label": "阜城县", "value": "8ce18ad3cecb4d94ac497efbe513a92e"}, {
                        "label": "冀州市",
                        "value": "ce788d6923c04834a4b9e39e0c1ff0f6"
                    }, {"label": "深州市", "value": "25381d0283a84717b2fc84b39784a943"}],
                    "label": "衡水",
                    "value": "8104fdfdc26e4e5492a38e4451b472ed"
                }], "label": "河北", "value": "c4539b80057442e1890e7d55035189b1"
            }, {
                "children": [{
                    "children": [{
                        "label": "小店区",
                        "value": "80278b5b1cdd4bf7a52b93b071647191"
                    }, {"label": "迎泽区", "value": "f1cca08301134f0a8ce28c2362c5c3f0"}, {
                        "label": "杏花岭区",
                        "value": "e35f3af8f64c45ae89a0a5c2fe79ea13"
                    }, {"label": "尖草坪区", "value": "8ff495e95f074642be1e762e9ec58f31"}, {
                        "label": "万柏林区",
                        "value": "683feb5695a3450eba2edcc0ec270f55"
                    }, {"label": "晋源区", "value": "dce13f7459554e84b34b0e4e56bc39cb"}, {
                        "label": "清徐县",
                        "value": "fe3dce8e244d4c9da1d8a9e8f0d4e49c"
                    }, {"label": "阳曲县", "value": "b40902cf91af44d99264b71b7e5471e0"}, {
                        "label": "娄烦县",
                        "value": "5d176672481e4306b8630499cbe41aca"
                    }, {"label": "古交市", "value": "41d5196687884c8db870bd964941a477"}],
                    "label": "太原",
                    "value": "1a1e2d1a645d4c3fbcbc28b4a424238f"
                }, {
                    "children": [{"label": "城  区", "value": "39ef18b526aa4a02bee567acaf40b0ab"}, {
                        "label": "矿  区",
                        "value": "9251e8e688e84552a5d1de27511bf287"
                    }, {"label": "南郊区", "value": "f9f3b809e5e445ae8a90bb9942a77c04"}, {
                        "label": "新荣区",
                        "value": "d31629172c704fb8ae95b77017532ff6"
                    }, {"label": "阳高县", "value": "3900a6237df64484a7bf4150fdce83b6"}, {
                        "label": "天镇县",
                        "value": "f462707b6cd9452f859d875d7b0ca914"
                    }, {"label": "广灵县", "value": "8398acf1c3574a88b875acab7dac6a6f"}, {
                        "label": "灵丘县",
                        "value": "110cb994dd3f4415aa728808d5988467"
                    }, {"label": "浑源县", "value": "6d1a6432af4b437ab0d65c06e9562d64"}, {
                        "label": "左云县",
                        "value": "245393806fa6459993d3e4394e06b664"
                    }, {"label": "大同县", "value": "1bfc795309e0468a83c1bb6f20f53dbe"}],
                    "label": "大同",
                    "value": "d6d0f1f61a9e4e848052605865131d77"
                }, {
                    "children": [{"label": "城  区", "value": "ffdf3437d64840598d98dccd41d312ff"}, {
                        "label": "矿  区",
                        "value": "447663ca42554e0781ec072ef98e5acd"
                    }, {"label": "郊  区", "value": "669966e3038a40caba00085e622302ee"}, {
                        "label": "平定县",
                        "value": "32ee943d87f44261984fa758a358c9a5"
                    }, {"label": "盂  县", "value": "8d831e1845224dc5be4ac6ef3e24fc10"}],
                    "label": "阳泉",
                    "value": "250e68fd273240a9bcb453ffdb5f4d89"
                }, {
                    "children": [{"label": "城  区", "value": "04789b04c5a24ea8828eae09553eee4c"}, {
                        "label": "郊  区",
                        "value": "c7f742596ef24ff08a0715de92a9e096"
                    }, {"label": "长治县", "value": "1d55fc73398947d7bebda32e3e563f3e"}, {
                        "label": "襄垣县",
                        "value": "84d71d36b1da433cabe3886956141e27"
                    }, {"label": "屯留县", "value": "4e19b1d9db844e6d90bf73f0ed73bfb6"}, {
                        "label": "平顺县",
                        "value": "f040bd3f8240441e9ae9f7ae0c4c133b"
                    }, {"label": "黎城县", "value": "70c0e7ce9d6e44f3b88cffe5d6df6842"}, {
                        "label": "壶关县",
                        "value": "d2b818069fec42d28ac0383f886b5109"
                    }, {"label": "长子县", "value": "664530550b9c4836af566175e01f11e5"}, {
                        "label": "武乡县",
                        "value": "e85d5e3d054a4e3bb3a37e6a81f3ade5"
                    }, {"label": "沁  县", "value": "dee3a6a0b98e4e00932b095b595ab24f"}, {
                        "label": "沁源县",
                        "value": "9718045ee8ce4691806aa4e2c8e86308"
                    }, {"label": "潞城市", "value": "e98ca64770a84b7a891d63780dd1cd72"}],
                    "label": "长治",
                    "value": "f4c9109dec07410caa4d965ec5e3f08e"
                }, {
                    "children": [{"label": "城  区", "value": "5caaa25e6fea4c748d531d8241be6059"}, {
                        "label": "沁水县",
                        "value": "9ab74988d0a6494a9d3b73bf4f90c64b"
                    }, {"label": "阳城县", "value": "17993295ba8b4083b4cd30c4d22a1858"}, {
                        "label": "陵川县",
                        "value": "4d699725770a43bf9493138dff610c78"
                    }, {"label": "泽州县", "value": "d0aa68e3f3664378a10aae2f5d407e84"}, {
                        "label": "高平市",
                        "value": "e9f6f3acb7f74086bfebe6bcfc654370"
                    }], "label": "晋城", "value": "51b118e490f741d6bd194c79c64d3040"
                }, {
                    "children": [{"label": "朔城区", "value": "b1c6d45d01bd48038e66b82342e45294"}, {
                        "label": "平鲁区",
                        "value": "d89111a8f77c47fb8309269a2d33e38e"
                    }, {"label": "山阴县", "value": "f68d30db23094bb4ad1d406e1ebf6b3b"}, {
                        "label": "应  县",
                        "value": "6eb64b56ec234d738f3d48a36cf1ae0f"
                    }, {"label": "右玉县", "value": "2e1f8722bbab444bb4b7c0a51ebd9903"}, {
                        "label": "怀仁县",
                        "value": "e8203a6d69de4610bf860d0a4af5ff22"
                    }], "label": "朔州", "value": "041697d6ba794ea9a3e97cb1dbc7b073"
                }, {
                    "children": [{"label": "忻府区", "value": "296ed8ff4b0943a4bcb26dcd43b6d1bd"}, {
                        "label": "原平市",
                        "value": "4ca8cb9cc590419fb4582dc27d2a2845"
                    }, {"label": "定襄县", "value": "bbec4edf096b48ed90b91f489c20388e"}, {
                        "label": "五台县",
                        "value": "8adc89cf3dbf4c899dc0ac4c2e3189a8"
                    }, {"label": "代  县", "value": "05bb2f2643a0415cb16589cb4912e2f2"}, {
                        "label": "繁峙县",
                        "value": "a569a9d1961a486e865a1c5b81024488"
                    }, {"label": "宁武县", "value": "4a1a168982714d44b90a1d6e52538ce7"}, {
                        "label": "静乐县",
                        "value": "4c5c45b7aeb34fc291d79aaa2df38957"
                    }, {"label": "神池县", "value": "67f45232c69440c89fb14e649db0d80a"}, {
                        "label": "五寨县",
                        "value": "817151a1feb64ab8858c268c0a88e1a7"
                    }, {"label": "岢岚县", "value": "8c03e1c2ef22460faa837aa9813fcdbf"}, {
                        "label": "河曲县",
                        "value": "019ff7dd4a4d410080755402176347f5"
                    }, {"label": "保德县", "value": "3045bf544e6e4ba3b61b0187c000366d"}, {
                        "label": "偏关县",
                        "value": "80a986e4decd4bbe838353a542d366f9"
                    }], "label": "忻州", "value": "8b1f57d9ec594a39a9b05e3c6c51f314"
                }, {
                    "children": [{"label": "离石区", "value": "fba2013587b641e7aaf30af4ee4c4d6d"}, {
                        "label": "孝义市",
                        "value": "786d3dae86494c82a23ee9e93de17ef8"
                    }, {"label": "汾阳市", "value": "6ff7330c5f6c470faeeb19a9139bd023"}, {
                        "label": "文水县",
                        "value": "30557976c88441d295e6ed2b7d052fdd"
                    }, {"label": "交城县", "value": "6e0cce6d72564331a09e69b876d57453"}, {
                        "label": "兴  县",
                        "value": "d2e6682605f0464497a292f7512544ea"
                    }, {"label": "临  县", "value": "82532a49d6fe468d83dfe51562e273c3"}, {
                        "label": "柳林县",
                        "value": "f46369ee9eee4310b6af0b87c675621e"
                    }, {"label": "石楼县", "value": "a6ed6c4e9fea4c30b002598849a27a99"}, {
                        "label": "岚  县",
                        "value": "02969048c84149ccae8143261aa3632c"
                    }, {"label": "方山县", "value": "476772f6e2a44734bbb3374696fcff4d"}, {
                        "label": "中阳县",
                        "value": "61c35b030d6248198c38432c26e7587c"
                    }, {"label": "交口县", "value": "bc0aea9abca145e98bf0f656fcbc0ae9"}],
                    "label": "吕梁",
                    "value": "04d9e5b9c5e94274aa5c04dbbfd13f66"
                }, {
                    "children": [{"label": "榆次市", "value": "dc726f7bceee469e82dadb6bb337f972"}, {
                        "label": "介休市",
                        "value": "265b37bd8e794f37b34f12988e365e28"
                    }, {"label": "榆社县", "value": "06b46a11fcac4c698e579115d526344e"}, {
                        "label": "左权县",
                        "value": "ef82ea254e0549b98e87b698075c2308"
                    }, {"label": "和顺县", "value": "fc9f5375a47d498e98b4824571129cd5"}, {
                        "label": "昔阳县",
                        "value": "1793e56fa50947aca998b5b2b70ca7d3"
                    }, {"label": "寿阳县", "value": "b2cfb59da7f547f2a0dc20db3768c36c"}, {
                        "label": "太谷县",
                        "value": "da92312b2abd4561b475df883215cdf8"
                    }, {"label": "祁  县", "value": "01d084284c054a22a76e0e6d61df3521"}, {
                        "label": "平遥县",
                        "value": "f2bfc720b2514dd183d067373a2a178a"
                    }, {"label": "灵石县", "value": "4999c187b69b45d8b5da790f05c02b91"}],
                    "label": "晋中",
                    "value": "6230c69106c44dfc993abb953ca0e5d0"
                }, {
                    "children": [{"label": "临汾市", "value": "616442dabd574073b91c04602aa2e67c"}, {
                        "label": "侯马市",
                        "value": "59b70adc06954f8db148c6c95bbc9958"
                    }, {"label": "霍州市", "value": "33a399664e0b409cb0b14d32db926b78"}, {
                        "label": "曲沃县",
                        "value": "7d3b49a8d25649a48c8fa8fa861abda0"
                    }, {"label": "翼城县", "value": "95ea943b7059461cac7e046eb28d0dfd"}, {
                        "label": "襄汾县",
                        "value": "dc7c09a1f2cc42119c34f9059c7e2fcc"
                    }, {"label": "洪洞县", "value": "6df200e948ba45cebda59745755c3725"}, {
                        "label": "古  县",
                        "value": "d09327eca9f94081897d31f3fa80edfc"
                    }, {"label": "安泽县", "value": "f9c6e8b9037a4946bc5d947ff78f21cf"}, {
                        "label": "浮山县",
                        "value": "4d49b0eaf8db486bbad4022fe03da4f5"
                    }, {"label": "吉  县", "value": "26d0b5c9b5b34bae88e96d1e9e71673e"}, {
                        "label": "乡宁县",
                        "value": "4012df0d340e47ac876878236c7a197e"
                    }, {"label": "蒲  县", "value": "b03e0412d46d49c1b64b6d6cb1286319"}, {
                        "label": "大宁县",
                        "value": "d3fdd384cc08490aa1ada633513338c6"
                    }, {"label": "永和县", "value": "664113fb02264fc08971ea60faf86a01"}, {
                        "label": "隰  县",
                        "value": "41ce3a3d5863450eaa82cd016f79e798"
                    }, {"label": "汾西县", "value": "dffd2dd58fe040aeb9108a1b0805128d"}],
                    "label": "临汾",
                    "value": "a6203bbb32084e699d9669d3a213205e"
                }, {
                    "children": [{"label": "运城市", "value": "98a29eb8f6654bb8ba81b8a29a0c9c63"}, {
                        "label": "永济市",
                        "value": "98f281bcc6bd428ca2dadc717f8f3288"
                    }, {"label": "河津市", "value": "ca7f6b96ed964ec9b3e6d9f15d270990"}, {
                        "label": "芮城县",
                        "value": "d826e8ca1522400898675672754207f4"
                    }, {"label": "临猗县", "value": "f8da49a789504109bc2d92159bc2d4b7"}, {
                        "label": "万荣县",
                        "value": "24cf9a0198424eccb7113c236e0c60d4"
                    }, {"label": "新绛县", "value": "d4733e9437554caf90edc3f67d517e9d"}, {
                        "label": "稷山县",
                        "value": "f045e0caa4ca4191af47d338c96e2111"
                    }, {"label": "闻喜县", "value": "5ff02c33fe824daaae85694a36a1d03c"}, {
                        "label": "夏  县",
                        "value": "7dddf21350b145b88886448b50272f8d"
                    }, {"label": "绛  县", "value": "00cee848fba74b9a87bd9ca326c10c04"}, {
                        "label": "平陆县",
                        "value": "fd378da1764d482ca2e868605f24f253"
                    }, {"label": "垣曲县", "value": "2348fe0dbb6f4d7c89a0ed5be91309b7"}],
                    "label": "运城",
                    "value": "e3c771b7630f44199bfe95df6c480fab"
                }], "label": "山西", "value": "271292e6ca21480ea95d393c659388de"
            }, {
                "children": [{
                    "children": [{
                        "label": "新城区",
                        "value": "316520bf43804ee682ced48deb8ac643"
                    }, {"label": "回民区", "value": "5d223138d22644ef948e60759e04b16a"}, {
                        "label": "玉泉区",
                        "value": "4a19eef00b1644a6894b2c6640102f78"
                    }, {"label": "郊  区", "value": "3b347ad525624548ba78d103ddbb9e04"}, {
                        "label": "土默特左旗",
                        "value": "f149c57e24cf41e8884f69e83064eff9"
                    }, {"label": "托克托县", "value": "3cff1420e3a4479991ddc0cff6fc9a5a"}, {
                        "label": "和林格尔县",
                        "value": "2fbb72f420b346c18fad03de54facd3b"
                    }, {"label": "清水河县", "value": "ec6c8ed57e1f46cfac37fd589f5ebaa9"}, {
                        "label": "武川县",
                        "value": "c28df47236364ef3ae31694db9945482"
                    }], "label": "呼和浩特", "value": "024249cbe6c7497a83a546c885935bd7"
                }, {
                    "children": [{"label": "东河区", "value": "c02dc3545f92427aae9ffe221f1b8f64"}, {
                        "label": "昆都伦区",
                        "value": "dff5711a203a483e9faf14e8d6039e41"
                    }, {"label": "青山区", "value": "b4278c89f46a464db39e7a74249ef630"}, {
                        "label": "石拐矿区",
                        "value": "84204ee3e022471fbb530048ffb6dcd6"
                    }, {"label": "白云矿区", "value": "0a9e7fe68d56464cb6d925f056565a9f"}, {
                        "label": "郊  区",
                        "value": "4d830cda378b4022b214d5bd11bcd421"
                    }, {"label": "土默特右旗", "value": "fcc61167c49243a2bd147d70bfa7201a"}, {
                        "label": "固阳县",
                        "value": "26352d67be45450881cb3226263a4c79"
                    }, {"label": "达尔罕茂明安联合旗", "value": "4219b6b43a3b49a7be4e61226d34535d"}],
                    "label": "包头",
                    "value": "c7909a8fdf614a7aab55c37140f1fc14"
                }, {
                    "children": [{"label": "海勃湾区", "value": "a57688f941da494bb8174c665d64ea4a"}, {
                        "label": "海南区",
                        "value": "bca0fd5a42554d5999c2f97d1f5abcc2"
                    }, {"label": "乌达区", "value": "1d9163f392f143a9aab8f087ef637bfd"}],
                    "label": "乌海",
                    "value": "d007473eb4384bc18066403b010ca65f"
                }, {
                    "children": [{"label": "红山区", "value": "d171e04531c84073b82994d77b2ae993"}, {
                        "label": "元宝山区",
                        "value": "fab074ab1fda405990c70f9ae651399c"
                    }, {"label": "松山区", "value": "077b44174c0742b2819684eb034551e4"}, {
                        "label": "阿鲁科尔沁旗",
                        "value": "7004cc90ebfa4a3e86a1422e71b7714a"
                    }, {"label": "巴林左旗", "value": "d6767347bd1e487e86af38391de74149"}, {
                        "label": "巴林右旗",
                        "value": "766d0842abcf4e5997ed271e11c98bc3"
                    }, {"label": "林西县", "value": "44693019c658476a86958c8d2babfd72"}, {
                        "label": "克什克腾旗",
                        "value": "07485dabd10143a4ba3b9f8f456c646b"
                    }, {"label": "翁牛特旗", "value": "ef5adecb7d6d4de686ffdbe03b2891fa"}, {
                        "label": "喀喇沁旗",
                        "value": "84e907dea69a4614b709b367a6cca359"
                    }, {"label": "宁城县", "value": "d12c4f43542845a6b7accee89851824f"}, {
                        "label": "敖汉旗",
                        "value": "885a67325e2f4b9e85b3c4c8b902fad3"
                    }], "label": "赤峰", "value": "7db785d7abc546189cc2291ffb5be1b3"
                }, {
                    "children": [{"label": "海拉尔市", "value": "d72d34b1e8db45d793b3cc3ccc08d360"}, {
                        "label": "满洲里市",
                        "value": "30c725b5a16742599e12ca45c99c0986"
                    }, {"label": "扎兰屯市", "value": "ea1197d2d84e4d5eb8b02daddedfd6ee"}, {
                        "label": "牙克石市",
                        "value": "9542826eac8340cb83278ab4d311e47f"
                    }, {"label": "根河市", "value": "8dc2a754b119415888f9aeb6f43a9fc1"}, {
                        "label": "额尔古纳市",
                        "value": "e1832cc1f6394654acec6f522e200114"
                    }, {"label": "阿荣旗", "value": "aaa5ce1b233d4054bd3afc6156edcf6d"}, {
                        "label": "莫力达瓦达斡尔族自治旗",
                        "value": "33bbc86cba5d4d6599a8222e55535f93"
                    }, {"label": "鄂伦春自治旗", "value": "d7583e5b6e1941b7b56c1dd5fa452615"}, {
                        "label": "鄂温克族自治旗",
                        "value": "4f2a860af6eb4d8084b230eb9f4bfbd2"
                    }, {"label": "新巴尔虎右旗", "value": "44be8de3b42547fea10d4bb99e6a972a"}, {
                        "label": "新巴尔虎左旗",
                        "value": "8a7d0579cf1f4c02b2bef687715517dd"
                    }, {"label": "陈巴尔虎旗", "value": "bbe4a5ac43a24736a1275481cfc032ac"}],
                    "label": "呼伦贝尔",
                    "value": "b3ef019524424f5090b3fc05f6de2531"
                }, {
                    "children": [{"label": "乌兰浩特市", "value": "1f800b0070b8429ea584878065e7250f"}, {
                        "label": "阿尔山市",
                        "value": "340ff67e6e464bcaae40eb2c1a70de7e"
                    }, {"label": "科尔沁右翼前旗", "value": "bd987cadf60f42d9a9959f512ec26ee0"}, {
                        "label": "科尔沁右翼中旗",
                        "value": "188b9c466d5344b49d1aa2b603bc65f7"
                    }, {"label": "扎赉特旗", "value": "101f37a81716495484d7eb64ae9c6877"}, {
                        "label": "突泉县",
                        "value": "91083d3a77634c7cb7106e96304fbe5d"
                    }], "label": "兴安盟", "value": "ef1ec77a7e674b5d886c31901ef2f73e"
                }, {
                    "children": [{"label": "科尔沁区", "value": "fd0391f3185448baa9c628b0757b89dd"}, {
                        "label": "霍林郭勒市",
                        "value": "4693e0df13de4e00960cd7a607fde508"
                    }, {"label": "科尔沁左翼中旗", "value": "6b93339112424eb08db2171b3a6cb88c"}, {
                        "label": "科尔沁左翼后旗",
                        "value": "aa43b7d20df848a898c29e835bd59a49"
                    }, {"label": "开鲁县", "value": "b665de51cab8427684372b3ddbf46335"}, {
                        "label": "库伦旗",
                        "value": "416bd27fe24b499a864a94e309355356"
                    }, {"label": "奈曼旗", "value": "aedd462128244b5b932e9696f9ad0635"}, {
                        "label": "扎鲁特旗",
                        "value": "2000f1a23b7e420a91806645410d5031"
                    }], "label": "通辽", "value": "4e3271fd30ad4f71bd3f06fda9a5a7ee"
                }, {
                    "children": [{"label": "二连浩特市", "value": "20d97e35e0284ab9b9357f977b1d655f"}, {
                        "label": "锡林浩特市",
                        "value": "ae3776c900d24b55b970c04f366287c4"
                    }, {"label": "阿巴嘎旗", "value": "6d27a7d1786746e5b5f6134d8dbb576e"}, {
                        "label": "苏尼特左旗",
                        "value": "3d49792f47d045b78e315f61286407f4"
                    }, {"label": "苏尼特右旗", "value": "7979e02a93ce422f9fe957e43b735723"}, {
                        "label": "东乌珠穆沁旗",
                        "value": "5447ba7318574e3aaa7cbb9d14ba8e74"
                    }, {"label": "西乌珠穆沁旗", "value": "9530a82ad45445818234567c4e10b328"}, {
                        "label": "太仆寺旗",
                        "value": "1160fd1e4a1b445fbaf7fd5535ec16e2"
                    }, {"label": "镶黄旗", "value": "3f6e3056810d4b06a31dae68dc1898f5"}, {
                        "label": "正镶白旗",
                        "value": "f807fe07fd8f46509887e9b78a654b2a"
                    }, {"label": "正蓝旗", "value": "89c166ea7956473c99f65699b5a5efcc"}, {
                        "label": "多伦县",
                        "value": "e61213401aa64c04a7820950eebd093a"
                    }], "label": "锡林郭勒盟", "value": "3f4b638f328842829dec8bf44bf7213c"
                }, {
                    "children": [{"label": "集宁市", "value": "c5fd9b3382b54eb3be75186f0af0b07e"}, {
                        "label": "丰镇市",
                        "value": "f72e510412364746928f14eb0dba3700"
                    }, {"label": "卓资县", "value": "03b406e75f0847999514f720dc6b0735"}, {
                        "label": "化德县",
                        "value": "b6877b4742fe477ea13c757970f284ea"
                    }, {"label": "商都县", "value": "a443157e8a124f59b5b2cac5f2e2d643"}, {
                        "label": "兴和县",
                        "value": "f222e13b7be342e3ae1a862ce4e688d4"
                    }, {"label": "凉城县", "value": "160ce0ee7c5d40028f91fabefaad869d"}, {
                        "label": "察哈尔右翼前旗",
                        "value": "492bafbea1b34af28bafadb59133916e"
                    }, {"label": "察哈尔右翼中旗", "value": "0240969dff8d4c2390563282f3066998"}, {
                        "label": "察哈尔右翼后旗",
                        "value": "7fa8118373f3402ba99044f6f6723908"
                    }, {"label": "四子王旗", "value": "8c3b3935139a44b1a8291ac61d244d5d"}],
                    "label": "乌兰察布盟",
                    "value": "7921e031f3404a459fe23860be1e8712"
                }, {
                    "children": [{"label": "东胜市", "value": "2a0f011b3d5d41c4a33343769f1f613f"}, {
                        "label": "达拉特旗",
                        "value": "c1f0e5ccb31a4c2e89f23c7ce866ae1d"
                    }, {"label": "准格尔旗", "value": "a3d7909f34ab44ce892d3bc6f1fd22c0"}, {
                        "label": "鄂托克前旗",
                        "value": "d8121b79301d43cd86157a1a30ce7c08"
                    }, {"label": "鄂托克旗", "value": "18d76e5629154adc896d37b0aab9ed10"}, {
                        "label": "杭锦旗",
                        "value": "83bd4f7e3573421b967c310c4857cc62"
                    }, {"label": "乌审旗", "value": "1b0201a6ec874b8a82471dcb132b41d4"}, {
                        "label": "伊金霍洛旗",
                        "value": "528206ac93634e758682470b0ac5d19d"
                    }], "label": "伊克昭盟", "value": "5921953fccfc412ba831bc016c8e79ab"
                }, {
                    "children": [{"label": "临河市", "value": "c0335e5e3b124f94ac6e39e01b6ca99b"}, {
                        "label": "五原县",
                        "value": "c238fbe5e9be43acb602a31130c10d7f"
                    }, {"label": "磴口县", "value": "34b1fbf8e22948a5915f57110ab29099"}, {
                        "label": "乌拉特前旗",
                        "value": "741a1a41338d4d0b897b4a23a2ae23cc"
                    }, {"label": "乌拉特中旗", "value": "7fbb0b9ed44042058ed80abf62375a1a"}, {
                        "label": "乌拉特后旗",
                        "value": "77570ea831a040f886c28b9b77f66a6b"
                    }, {"label": "杭锦后旗", "value": "41d39f43761f4d9b9b0659de47055388"}],
                    "label": "巴彦淖尔盟",
                    "value": "7e86efe3b28741598588ed070eb3f9f4"
                }, {
                    "children": [{"label": "阿拉善左旗", "value": "2ba6fda9103f4a7d9fb6176554bece34"}, {
                        "label": "阿拉善右旗",
                        "value": "29c996fceca142f0894cb82e54c65728"
                    }, {"label": "额济纳旗", "value": "4eaf91d818624863ac740fe881ddf57c"}],
                    "label": "阿拉善盟",
                    "value": "9e29ee2d66ac4f3e908374d409ba8e71"
                }], "label": "内蒙古", "value": "af9ffd4f51d04e0fbbf0571b58bded18"
            }, {
                "children": [{
                    "children": [{
                        "label": "沈河区",
                        "value": "a5b0857088d345bf9ff9e84e54e237f4"
                    }, {"label": "皇姑区", "value": "d148c24acf834b23b61a8524dc3a83ee"}, {
                        "label": "和平区",
                        "value": "95fc0e6d479a4ccfb341cc51a23dd2f3"
                    }, {"label": "大东区", "value": "72f9ab128a7a41fd83b4abe285a2e7b0"}, {
                        "label": "铁西区",
                        "value": "8b346f5157c6496da574ef9407e01792"
                    }, {"label": "苏家屯区", "value": "896c6e340ce14559b1f210d6c2c84f9b"}, {
                        "label": "东陵区",
                        "value": "0679b399a5e543eb8cc24d41948a1c4f"
                    }, {"label": "于洪区", "value": "9d05b648e26443d5aa2a9b2792450970"}, {
                        "label": "新民市",
                        "value": "5f896992466441718e053090c5916cc9"
                    }, {"label": "法库县", "value": "1cf2cb2e6f334b4a82646fa80c4163e7"}, {
                        "label": "辽中县",
                        "value": "e9e3fc33dfe248c6a2d358455a36eb04"
                    }, {"label": "康平县", "value": "85b8f9ab4ca34cf8a8308a66fb05d403"}, {
                        "label": "新城子区",
                        "value": "eb818969732640a68ca4fe6f9b341c91"
                    }, {"label": "其他", "value": "fddac1389d2d4e6b9eca06bd75e14cb0"}],
                    "label": "沈阳",
                    "value": "5dfb886a786d4a539a8290956ca5ef3b"
                }, {
                    "children": [{"label": "西岗区", "value": "08a7d079bb434a529c7c86eed12f59b5"}, {
                        "label": "中山区",
                        "value": "7d0d1524ae61468986eae462364a314b"
                    }, {"label": "沙河口区", "value": "7532d7b9f5de494cb29c8991047fc197"}, {
                        "label": "甘井子区",
                        "value": "f8ebff41f3aa46f292f549d418f6b8fe"
                    }, {"label": "旅顺口区", "value": "f2d63477b2c843a4acfb495311509b77"}, {
                        "label": "金州区",
                        "value": "df9c418e778d4c9e8c72d3788259b591"
                    }, {"label": "瓦房店市", "value": "f2f845ceb5bd4faabe90765f02ceef8c"}, {
                        "label": "普兰店市",
                        "value": "9be8edc84eb0474fbd8496954f823eaf"
                    }, {"label": "庄河市", "value": "99b7dc0924d148a2b3bb64bcbb71d0ce"}, {
                        "label": "长海县",
                        "value": "0f171a825d8641308ffcbcab2bfa8881"
                    }, {"label": "其他", "value": "6b2577f3220b47f1bcfa81f8da1186e3"}],
                    "label": "大连",
                    "value": "eae685f4eba7467eabbc4aa756dd7fa9"
                }, {
                    "children": [{"label": "铁东区", "value": "e287771bea194a4e9aa99babfc29a339"}, {
                        "label": "铁西区",
                        "value": "6a546c5866d34025bd8e9c1040dfef93"
                    }, {"label": "立山区", "value": "59b3ff8292d54a6ca202372cf9671ff9"}, {
                        "label": "千山区",
                        "value": "16a3e39c943c4230ac09f0449561fc55"
                    }, {"label": "海城市", "value": "4d481f6b393f4ea0bf1d26b897ac7864"}, {
                        "label": "台安县",
                        "value": "64778982c2c94ae7ae92e6afdc358dd0"
                    }, {"label": "岫岩满族自治县", "value": "367d34d7f0c04827a51a0cd0b4ab4861"}, {
                        "label": "其他",
                        "value": "f07d5c5064384d75a642da255154eaf2"
                    }], "label": "鞍山", "value": "9ac1683699cb41e68aa96f5ee97b2c57"
                }, {
                    "children": [{"label": "顺城区", "value": "64561e58f93a498a9068f20105c5defc"}, {
                        "label": "新抚区",
                        "value": "f1782f4f281c42259c6a441cc76a26ef"
                    }, {"label": "东洲区", "value": "55c221ee3053457ea16219c658f4c4c9"}, {
                        "label": "望花区",
                        "value": "4fa050e0783c43f4bdd33e500f2930bf"
                    }, {"label": "抚顺县", "value": "82db4472c23a4a399a36d7c26cd1a22c"}, {
                        "label": "清原满族自治县",
                        "value": "47bfb5ef3e024809a3f6e3458fceb689"
                    }, {"label": "新宾满族自治县", "value": "bf42c4c5c9ec48e9884d0a467aec4053"}, {
                        "label": "其他",
                        "value": "ef4eacadb2d148fa950d3c0fd4158c04"
                    }], "label": "抚顺", "value": "d59d3b9627ea43109115639974ea22c2"
                }, {
                    "children": [{"label": "平山区", "value": "a2ecf3ac5b68474d90d88f957b207401"}, {
                        "label": "明山区",
                        "value": "f69b454cf2f84495bc9fe7cabfda5e08"
                    }, {"label": "溪湖区", "value": "fa1fe4195db94c7c97d1f3bfd6b14cfe"}, {
                        "label": "南芬区",
                        "value": "b38df176f0854264bb47eccf463b86ac"
                    }, {"label": "本溪满族自治县", "value": "dd2dd30c708145fb817567cd50d7d764"}, {
                        "label": "桓仁满族自治县",
                        "value": "c0cc8ce028894d9ea9bf10b778a5f17c"
                    }, {"label": "其他", "value": "991d0760811d42c39435f2e24079b0e2"}],
                    "label": "本溪",
                    "value": "a21ced75168446cd9af5f0480b73378c"
                }, {
                    "children": [{"label": "振兴区", "value": "3e6ac5fdf5d940f8a0ceebcfcc57607a"}, {
                        "label": "元宝区",
                        "value": "b740319357e44816b9b08d65ce063846"
                    }, {"label": "振安区", "value": "4b928e376c884483a47431c9d0b1a75c"}, {
                        "label": "东港市",
                        "value": "5e918f5a91eb4907b772ab715d68bea4"
                    }, {"label": "凤城市", "value": "f761d0db3f3545d7b5bc0f58f117d0b5"}, {
                        "label": "宽甸满族自治县",
                        "value": "17c4eea2771c4851b003484178b9b1e1"
                    }, {"label": "其他", "value": "478476017b64409d993b7f4948080a45"}],
                    "label": "丹东",
                    "value": "03dbdb2782c64bf4bd261f89ad64c06a"
                }, {
                    "children": [{"label": "太和区", "value": "3dbd33b5e63444aebd721d8dd12d10df"}, {
                        "label": "古塔区",
                        "value": "40db2ad864f2493989e1d57daa316aa7"
                    }, {"label": "凌河区", "value": "1a172007d5324c8f9cbaff3b2bf3c95b"}, {
                        "label": "凌海市",
                        "value": "f7c39922549848cda9ef7b119282729d"
                    }, {"label": "黑山县", "value": "4acfc0daab7a4adb933d21c9805c937d"}, {
                        "label": "义县",
                        "value": "a91c8a4332cd413d83995c2c7c4128e0"
                    }, {"label": "北宁市", "value": "41d47f2a776d4112963a2bed2bd3f313"}, {
                        "label": "其他",
                        "value": "a8b1a9220b8345409ed976730040f643"
                    }], "label": "锦州", "value": "7fb3a6b9add248128ba4fac07316b540"
                }, {
                    "children": [{"label": "站前区", "value": "f8104ec9204b4931a51b393315826a5d"}, {
                        "label": "西市区",
                        "value": "c096219d824b4049bd2f0ccb6d1b2b30"
                    }, {"label": "鲅鱼圈区", "value": "f46a20e86de640968d1a16d4052af91a"}, {
                        "label": "老边区",
                        "value": "6dee1a003dba4082a510beab5d201756"
                    }, {"label": "大石桥市", "value": "089d194c12b848b88007c22a009720c1"}, {
                        "label": "盖州市",
                        "value": "f415cb9df44344139e1fd8a070d90b70"
                    }, {"label": "其他", "value": "6da0bf30615f429aad00c14909d0da2a"}],
                    "label": "营口",
                    "value": "99bfb35b408a4e2097d35b8729354cbb"
                }, {
                    "children": [{"label": "海州区", "value": "f4339705cb7b407395ffb5cab407ee3f"}, {
                        "label": "新邱区",
                        "value": "8697a5c1d83643258d3cc7cd6449ef75"
                    }, {"label": "太平区", "value": "bb1003a48cab479081f8ddc18d25e28a"}, {
                        "label": "清河门区",
                        "value": "d8404cc1e34c4213888407adc05d09ce"
                    }, {"label": "细河区", "value": "2b0e5db07a86460b9e9ee1b7cb7f0880"}, {
                        "label": "彰武县",
                        "value": "1d58492969dc414a9fca34903739808f"
                    }, {"label": "阜新蒙古族自治县", "value": "c9762f46e594452aa610661ee826b73e"}, {
                        "label": "其他",
                        "value": "46456571f89044519d50811219079e88"
                    }], "label": "阜新", "value": "20d6be008dbc460db49d834cc5877bd7"
                }, {
                    "children": [{"label": "白塔区", "value": "cc6489cd773642689dc9cf3941eeab47"}, {
                        "label": "文圣区",
                        "value": "fe76a9a4371b4fec8176c0e5c6232c34"
                    }, {"label": "宏伟区", "value": "e3457d8cd8724e799d3c4ae4cb428070"}, {
                        "label": "太子河区",
                        "value": "82e4c7f679cf4e328dcd8c16f0ff2bd9"
                    }, {"label": "弓长岭区", "value": "5887d8082257430f95bd8ae0eeecdb98"}, {
                        "label": "灯塔市",
                        "value": "581d81fe4e3646179f5af134705781c1"
                    }, {"label": "辽阳县", "value": "67718ac58bcb4c418f89603e183c72d4"}, {
                        "label": "其他",
                        "value": "cb9617877cd94722b07934e6c1dc36af"
                    }], "label": "辽阳", "value": "7d942475e383432e87a2132b0b8b9fe1"
                }, {
                    "children": [{"label": "双台子区", "value": "c3e510b56a4d46d99c0027f720d89f31"}, {
                        "label": "兴隆台区",
                        "value": "ec03511f0c7f456b946b5b57061d794a"
                    }, {"label": "盘山县", "value": "02172b95cd8843b192be19f55c27d62b"}, {
                        "label": "大洼县",
                        "value": "8e85c6c89b5c4131892f03471a10d6e9"
                    }, {"label": "其他", "value": "d68a5a08c005402cbf0e8ba43e46a3d5"}],
                    "label": "盘锦",
                    "value": "7962ba11330547a18683efe5957ac155"
                }, {
                    "children": [{"label": "银州区", "value": "df810308348242d59a87b7e0ba03b01f"}, {
                        "label": "清河区",
                        "value": "09e48e136cf249d39bf495f9ceebebaa"
                    }, {"label": "调兵山市", "value": "eba7848e6d134b4f881faf5fa18c4536"}, {
                        "label": "开原市",
                        "value": "ca0ac3abb3db42b3867986ce4c261876"
                    }, {"label": "铁岭县", "value": "1350f2e2ed894bd8a9edf686eddab6bd"}, {
                        "label": "昌图县",
                        "value": "ce3b765aeeeb4006a4529ab49d00e159"
                    }, {"label": "西丰县", "value": "a768883f7e1f457cb3f640db369a0378"}, {
                        "label": "其他",
                        "value": "0c912a1c746f4840bdbd4bed75d74d12"
                    }], "label": "铁岭", "value": "6fd677ffeab24c688fc4c1e29bc89cd0"
                }, {
                    "children": [{"label": "双塔区", "value": "1252a6a18d6f40c68b079cd8b5c1efb8"}, {
                        "label": "龙城区",
                        "value": "08447deb636e44eba296d9eb5880b2ef"
                    }, {"label": "凌源市", "value": "5d85a06a2df042f2a7bed61e02859d49"}, {
                        "label": "北票市",
                        "value": "738560c411ac41bfba43f9af8d069dba"
                    }, {"label": "朝阳县", "value": "cf1e8a4e525f4421913acbacdc75be19"}, {
                        "label": "建平县",
                        "value": "44eb690bb08549c698e8c5e2b1e5f7a0"
                    }, {"label": "喀喇沁左翼蒙古族自治县", "value": "f615c3b3e94247989c142b7204d5942e"}, {
                        "label": "其他",
                        "value": "d77c0f0fa63c482586e61e3511d2438e"
                    }], "label": "朝阳", "value": "9edb6b9071af417ab5917b9bc1ef1070"
                }, {
                    "children": [{"label": "龙港区", "value": "76edda673f0441dbbbf78fab511549ca"}, {
                        "label": "南票区",
                        "value": "b4a1c810fbd34d7ab8d5f253515213fd"
                    }, {"label": "连山区", "value": "6ae31780d73c40aba0e52b976e504f9d"}, {
                        "label": "兴城市",
                        "value": "34ca2f6160ee46e6a3b7a9af505f3627"
                    }, {"label": "绥中县", "value": "9ce352b147414ce9828919c42ec8a7a4"}, {
                        "label": "建昌县",
                        "value": "5d0dfe8004714b58af928ac086c4f9b9"
                    }, {"label": "其他", "value": "53ca7f820d4444bdbdb0904e3be4c127"}],
                    "label": "葫芦岛",
                    "value": "9e78310724254821a31e6bb04f547777"
                }, {
                    "children": [{"label": "其他", "value": "587a2f53130048da9925f9edc7e6e1f4"}],
                    "label": "其他",
                    "value": "af12a32573514e5881c60e256e7bd22b"
                }], "label": "辽宁", "value": "22542a8afcc54798b4679a99733b57d7"
            }, {
                "children": [{
                    "children": [{
                        "label": "朝阳区",
                        "value": "3de5bf3f8272416fb28e7da99457250e"
                    }, {"label": "宽城区", "value": "825b75357a1f4c058b4741d5792ab3b6"}, {
                        "label": "二道区",
                        "value": "d1f84fb437894b9798e0a2ee51495c92"
                    }, {"label": "南关区", "value": "cd2ad8d8939b4e5da0ac990562dfc3ba"}, {
                        "label": "绿园区",
                        "value": "78bb44e086fd446cb464ef1cc49c8946"
                    }, {"label": "双阳区", "value": "dbf38b45e1b94ff5aa9059645339d31a"}, {
                        "label": "九台市",
                        "value": "2e1da601712743dd8e7040413801afdd"
                    }, {"label": "榆树市", "value": "4e78ba8d824d47588c5a0d6ffbbdb493"}, {
                        "label": "德惠市",
                        "value": "a70c3e166ebe44c78c07d3ad68a0c253"
                    }, {"label": "农安县", "value": "b5a365a6f6414e09957e09f3628de445"}, {
                        "label": "其他",
                        "value": "2c6ac92709e04bd9b76b1e23a224d02b"
                    }], "label": "长春", "value": "658e91246ab34bc4b656a50c36ba19ce"
                }, {
                    "children": [{"label": "船营区", "value": "5540d3f5b0684ad78aa60ed68b1522fd"}, {
                        "label": "昌邑区",
                        "value": "6f9716d6dbae4507b2df1208402deeb2"
                    }, {"label": "龙潭区", "value": "787d0d73efce4259b6d7f24814056fbb"}, {
                        "label": "丰满区",
                        "value": "c08df73465e94f32844874d765ccd74d"
                    }, {"label": "舒兰市", "value": "c65ec580b22f40a3bab5ceb18bd5f051"}, {
                        "label": "桦甸市",
                        "value": "8b629a6be3ac4285a91cfa74317ecfcd"
                    }, {"label": "蛟河市", "value": "49cd0a3e6be74d75af951a8b4ea42a1f"}, {
                        "label": "磐石市",
                        "value": "b4329a5fc6c04100a309bfa6de0cf2d1"
                    }, {"label": "永吉县", "value": "c7b89e55db754c47bda997fb9625c60c"}, {
                        "label": "其他",
                        "value": "53ebb7de5cb3460a8a3488e4ac8eef94"
                    }], "label": "吉林", "value": "d267c088681d4896b1e55fb9145908be"
                }, {
                    "children": [{"label": "铁西区", "value": "14775d454db14720abca12522d5f568d"}, {
                        "label": "铁东区",
                        "value": "eecd634126964d40bbb2d07635c564ff"
                    }, {"label": "公主岭市", "value": "6538f15e957741059a5ee0c01c69083a"}, {
                        "label": "双辽市",
                        "value": "c27b448094944f5985dbc3b87fa705ac"
                    }, {"label": "梨树县", "value": "a3fbae1554ba481a94dfa598b5e891be"}, {
                        "label": "伊通满族自治县",
                        "value": "c3a597d56b2b4cfebb8528d7fad24800"
                    }, {"label": "其他", "value": "32394e24b58e46b399b39d0430f45d6b"}],
                    "label": "四平",
                    "value": "a46b794211e14a7c90ef0afb1b5991ba"
                }, {
                    "children": [{"label": "龙山区", "value": "2bb1e49a5c0a4e429df40d78724aeed5"}, {
                        "label": "西安区",
                        "value": "273a609f6bf248ac95b4e4f6903f48ee"
                    }, {"label": "东辽县", "value": "da9ab6bad8594cce8e6dbd5cba63093c"}, {
                        "label": "东丰县",
                        "value": "b8ab56c77e724696a021ee164afd5543"
                    }, {"label": "其他", "value": "d7875f15cfb445eba933f453f9efa093"}],
                    "label": "辽源",
                    "value": "23b3e9ba2f3f43e0b60569073c157630"
                }, {
                    "children": [{"label": "东昌区", "value": "ce1d19b9549248b7920ad9044367a198"}, {
                        "label": "二道江区",
                        "value": "e7e9ee0b0ad840e1b414e8612a629c6e"
                    }, {"label": "梅河口市", "value": "9e7e3a0921c64d84b2efb6f9e6a0c5fe"}, {
                        "label": "集安市",
                        "value": "649a487e5ae54e4bbadbd4a2459c99a5"
                    }, {"label": "通化县", "value": "910458024a534aeea5a68f5815faef54"}, {
                        "label": "辉南县",
                        "value": "c66869b0bd1148db83926712b0e6bac8"
                    }, {"label": "柳河县", "value": "12f88949891e4d1f996e8cd2c5907ddd"}, {
                        "label": "其他",
                        "value": "e97ad5d1ab8649e7902d1a8341057924"
                    }], "label": "通化", "value": "98335e22d2f046cf898ecb054d50347e"
                }, {
                    "children": [{"label": "八道江区", "value": "5c7080355461468f9e09e04b3aa3b0f6"}, {
                        "label": "江源区",
                        "value": "91e94140c2bc40c5a7aa3ab3a9155eb6"
                    }, {"label": "临江市", "value": "a0ecfb861c03434cb77fe9a479f78a7e"}, {
                        "label": "靖宇县",
                        "value": "7cfb340b9dd3408bb45c559398ac9be1"
                    }, {"label": "抚松县", "value": "af0da69e9df144a0a7150a304b6888bb"}, {
                        "label": "长白朝鲜族自治县",
                        "value": "cea58632f5ac49b692596950b326ca67"
                    }, {"label": "其他", "value": "f5e332a0fe2a4d25a4e13644c668cfc3"}],
                    "label": "白山",
                    "value": "da20ab284eea44cd9213f522aff99080"
                }, {
                    "children": [{"label": "宁江区", "value": "9526a82700a643bc9aee4bd9c486f5ce"}, {
                        "label": "乾安县",
                        "value": "4a5623e796674a5c88edae4dee00d959"
                    }, {"label": "长岭县", "value": "d7c9a3b7aab74e2687fca21e5e5a565d"}, {
                        "label": "扶余县",
                        "value": "b2ec9418ec64432f811ed7b8ae7930e2"
                    }, {"label": "前郭尔罗斯蒙古族自治县", "value": "ec01ca2803a34976acfb02518dc4c3f5"}, {
                        "label": "其他",
                        "value": "c89e54dfb7ed4872a74dd7bebb016b88"
                    }], "label": "松原", "value": "8af5fb532ff14895af7b7459d2f6fa3c"
                }, {
                    "children": [{"label": "洮北区", "value": "dfcd9ebf3c9d40518bbcf5646d9ca3e7"}, {
                        "label": "大安市",
                        "value": "7ae6a04c13e74f46b2379ba127d16319"
                    }, {"label": "洮南市", "value": "b4ae8b8d06834886826cfdb3f22fae80"}, {
                        "label": "镇赉县",
                        "value": "4d74c3eaa51e44bea38a66200d720bb4"
                    }, {"label": "通榆县", "value": "d6250cc00bcf4e29b632b9461662bece"}, {
                        "label": "其他",
                        "value": "859175eb514a44b5acc0e0121e0f63b3"
                    }], "label": "白城", "value": "89fe78d547294dd5a5d7afe1789ec9d9"
                }, {
                    "children": [{"label": "延吉市", "value": "59bed8e3346e482580386f41a9a4680e"}, {
                        "label": "图们市",
                        "value": "a91549ed1e2e40879921a842ac455a25"
                    }, {"label": "敦化市", "value": "e0e00c16969b4ae1843fb91ecdcfa3f1"}, {
                        "label": "龙井市",
                        "value": "d7555d5328ae493e97909c725af49933"
                    }, {"label": "珲春市", "value": "c0165c83999d4372863ecf969225af99"}, {
                        "label": "和龙市",
                        "value": "88e56e2f6e23408e95aadf8b850c5c05"
                    }, {"label": "安图县", "value": "48f7b6025c8740fa9daaa8f1ff4e1f0a"}, {
                        "label": "汪清县",
                        "value": "fd5aeb17ca8d42deb98674e831fcf272"
                    }, {"label": "其他", "value": "53b3c330fcc04f1490464cf5deabffb3"}],
                    "label": "延边朝鲜族自治州",
                    "value": "de0dab9819414ba7a5b12b274fda2bac"
                }, {
                    "children": [{"label": "其他", "value": "e93dac17f2b54a2da89559072af2fab2"}],
                    "label": "其他",
                    "value": "f1fae3c1997c4da5a93d9bfde607923c"
                }], "label": "吉林", "value": "9774004afe394a6aaf9d35624956c8d6"
            }, {
                "children": [{
                    "children": [{
                        "label": "松北区",
                        "value": "01ec5499f45240b0b31a1ec28c97e618"
                    }, {"label": "道里区", "value": "8ca9b11ad0a444bf8778a1f3eda9a4f3"}, {
                        "label": "南岗区",
                        "value": "612dd57e2cd342ec8db212f60422c1eb"
                    }, {"label": "平房区", "value": "95b1d09dcd4840e88bbfd34d7000df5c"}, {
                        "label": "香坊区",
                        "value": "3e7881900622481182d19decb17de3c8"
                    }, {"label": "道外区", "value": "1214846d35e14a38ad926bd6031e4b30"}, {
                        "label": "呼兰区",
                        "value": "9c57fc1c7545464487f976bb28b39f3b"
                    }, {"label": "阿城区", "value": "14f0d7ce2c3740d39c76e2296ede2d3a"}, {
                        "label": "双城市",
                        "value": "eda73849edb4418da15d62ec916fa326"
                    }, {"label": "尚志市", "value": "a77f2a9991a34377ad9f4e515985f5cd"}, {
                        "label": "五常市",
                        "value": "52a3e910731444c69e743c1a7556216f"
                    }, {"label": "宾县", "value": "0ceb68a4a26447cc9abf09a6f3877df1"}, {
                        "label": "方正县",
                        "value": "e3bdac2c63474b1aa6b02b115ba92dbe"
                    }, {"label": "通河县", "value": "9a26bd60d1d740d987ae0713efd4d19e"}, {
                        "label": "巴彦县",
                        "value": "167ca8e5102145ff90694667da70e9fb"
                    }, {"label": "延寿县", "value": "634bcfc9ec864c0c994cc87a05b918d7"}, {
                        "label": "木兰县",
                        "value": "bd4cfc7865bc47a1a1e738fa19155c54"
                    }, {"label": "依兰县", "value": "5bf057bb44a44f4ea97d8342de01413c"}, {
                        "label": "其他",
                        "value": "ec960908d78c48e1a32ed862b3dbca1a"
                    }], "label": "哈尔滨", "value": "a3680525494340bab765f3b209935241"
                }, {
                    "children": [{"label": "龙沙区", "value": "0ac2971f1daf40b589172268d4ec0485"}, {
                        "label": "昂昂溪区",
                        "value": "5d4b076a17204816ac79b8da945e4e35"
                    }, {"label": "铁锋区", "value": "683e7f17f0794731b2b889799ddf020b"}, {
                        "label": "建华区",
                        "value": "bcf706f08bf6414d95e356107d713fec"
                    }, {"label": "富拉尔基区", "value": "6b9725eaa5f24784915cbb9a32fd7066"}, {
                        "label": "碾子山区",
                        "value": "67759c57758449dcb5e7cb803d1583e6"
                    }, {"label": "梅里斯达斡尔族区", "value": "0c3ecd858a6445f9bffe95003e4da9a8"}, {
                        "label": "讷河市",
                        "value": "2d526cdb9b39487d8ccbc9193e308f2e"
                    }, {"label": "富裕县", "value": "581f4ae1698942669d9413b56a9a11aa"}, {
                        "label": "拜泉县",
                        "value": "54674ae4b3f74adab776ca3c5effff45"
                    }, {"label": "甘南县", "value": "05c20c4845574274a443d93e21296331"}, {
                        "label": "依安县",
                        "value": "5c476287fefb49e3a5be5f98fd57aa5c"
                    }, {"label": "克山县", "value": "075b54223065427ba6a2d3d573183ed0"}, {
                        "label": "泰来县",
                        "value": "195b45b569704f1182176a84a08a15ca"
                    }, {"label": "克东县", "value": "04a0363570f04f88882771ae50a78355"}, {
                        "label": "龙江县",
                        "value": "f49ea6d94013445bb82a0732bf805677"
                    }, {"label": "其他", "value": "635b103e854040baa67263a1c7a59cf2"}],
                    "label": "齐齐哈尔",
                    "value": "58e7daccc046435a827419c6a16eda6f"
                }, {
                    "children": [{"label": "兴山区", "value": "b9f4db347e2d4c0494c8756e14dc1939"}, {
                        "label": "工农区",
                        "value": "4a67447a521c4b948832d9c27a5ea3de"
                    }, {"label": "南山区", "value": "b32cd1bf1db84ed0862c8498d72be92a"}, {
                        "label": "兴安区",
                        "value": "eee3885d21f44bedaf7961058358497c"
                    }, {"label": "向阳区", "value": "6b0af266d0744077a8454045cd989139"}, {
                        "label": "东山区",
                        "value": "d7ac5ca39a6344b4b3c18404d2ceec14"
                    }, {"label": "萝北县", "value": "5106716935e84a8e84491684a97f78e0"}, {
                        "label": "绥滨县",
                        "value": "9fa839b271ce4cb2b05c73e93ec7e3c0"
                    }, {"label": "其他", "value": "af46b8b9443b447c9be4ffc82acaadc4"}],
                    "label": "鹤岗",
                    "value": "d53e5aedfd9041288af70c48420acf5a"
                }, {
                    "children": [{"label": "尖山区", "value": "e07983c794034b1cb2eb52358b400723"}, {
                        "label": "岭东区",
                        "value": "c20029ff0e93469ba386c8b8d1d23845"
                    }, {"label": "四方台区", "value": "35ade6d1f056451dbb7423a19f1d73ca"}, {
                        "label": "宝山区",
                        "value": "2e551b10d0c44506885dce1e6fd9bd45"
                    }, {"label": "集贤县", "value": "ef3cc6310ef7468cbfe9b1a71c07fdc2"}, {
                        "label": "宝清县",
                        "value": "18cec99b70e742febea0d2bdb774c2db"
                    }, {"label": "友谊县", "value": "202c02a9195945b2bdd737a66033489f"}, {
                        "label": "饶河县",
                        "value": "c391879da5224840b8669c876c5e3f87"
                    }, {"label": "其他", "value": "eca6d9bc82394f0eb8af742e0dda1996"}],
                    "label": "双鸭山",
                    "value": "fe5cb1297397406ca39314f36b1a5bb6"
                }, {
                    "children": [{"label": "鸡冠区", "value": "cdf6d8a6d7164787b9fe4bc03f4d76bf"}, {
                        "label": "恒山区",
                        "value": "0fd4fecd2053425abb4a98d07d6c654c"
                    }, {"label": "城子河区", "value": "69c798cce0b54461a715c68f846dfa62"}, {
                        "label": "滴道区",
                        "value": "83e3fdfbb49944c89625e2d3807df262"
                    }, {"label": "梨树区", "value": "f177cb38497f412a98d07bc74138771e"}, {
                        "label": "麻山区",
                        "value": "e0e26c2961754245bc165f9820a928a4"
                    }, {"label": "密山市", "value": "638d2fac1b544c7081dd793bcbb7a6f2"}, {
                        "label": "虎林市",
                        "value": "70520a4c69ed42fc9c1a266dfd9d3d4c"
                    }, {"label": "鸡东县", "value": "2ae3ea8910d248d5886f78a7759f4539"}, {
                        "label": "其他",
                        "value": "b48950fc02514c999e0c246f5645d1fe"
                    }], "label": "鸡西", "value": "6f586453f79147a6b90c37d23a0cea1e"
                }, {
                    "children": [{"label": "萨尔图区", "value": "075255da3df643a8acb1b783e17f6e50"}, {
                        "label": "红岗区",
                        "value": "2504cce9300e425c85a1d8a450b5d1f1"
                    }, {"label": "龙凤区", "value": "bb13c0c234184a19b6269d17d8bd9955"}, {
                        "label": "让胡路区",
                        "value": "bfb1b0680e2444f6aa59ac02bdfe1181"
                    }, {"label": "大同区", "value": "be1743ce35e34d15b4702c852d4f51e7"}, {
                        "label": "林甸县",
                        "value": "f21eff0235c24b69b17c043cfb8fdf9b"
                    }, {"label": "肇州县", "value": "7f0e159d454a40e78187a1e6ed3bd36c"}, {
                        "label": "肇源县",
                        "value": "ed729d16659a4846a2790958ae6b182c"
                    }, {"label": "杜尔伯特蒙古族自治县", "value": "46ec4b16029c4815a9e060dc5a0e945f"}, {
                        "label": "其他",
                        "value": "88ac9345fdd24789ac592747a03bda27"
                    }], "label": "大庆", "value": "2e150bfe76a14025add864b3a26b7708"
                }, {
                    "children": [{"label": "伊春区", "value": "686f2bec3f1b4ca78ba1e48b82163805"}, {
                        "label": "带岭区",
                        "value": "1f159a7f99fe436b83acd75dd6c45620"
                    }, {"label": "南岔区", "value": "f00cf55efecb40a2a77beda0fab86fa6"}, {
                        "label": "金山屯区",
                        "value": "e688580998474513bce3c39cb0f112f2"
                    }, {"label": "西林区", "value": "eed4fd7720224f95bb2d0d9e99b8f05e"}, {
                        "label": "美溪区",
                        "value": "17334c3742da478cb5e834aad01b28d2"
                    }, {"label": "乌马河区", "value": "187e0f92f3e04201ba3cfce32315b570"}, {
                        "label": "翠峦区",
                        "value": "bf78402065374478895a9e7df34e0a49"
                    }, {"label": "友好区", "value": "0204b9c9c0864fd19934095e1a8414a7"}, {
                        "label": "上甘岭区",
                        "value": "71731715870f441caecc1c6f8ecdc2fd"
                    }, {"label": "五营区", "value": "2c507e3c14a244b4872f3cbfb11f612e"}, {
                        "label": "红星区",
                        "value": "5d6d6a465b18491f873aa9541dd259cc"
                    }, {"label": "新青区", "value": "3cb455588c764f03a95569027cf84c34"}, {
                        "label": "汤旺河区",
                        "value": "186c474c6b7d4a459a8c921791e749fe"
                    }, {"label": "乌伊岭区", "value": "f35f2937c6d64d3caa398cc5ce8f3d33"}, {
                        "label": "铁力市",
                        "value": "fdfc974b807b4e129c19953dc66562a3"
                    }, {"label": "嘉荫县", "value": "89d0ddb7dad64a6297c71388b6bd7d9d"}, {
                        "label": "其他",
                        "value": "74b4d27736f342e69f8be5bf0bd19648"
                    }], "label": "伊春", "value": "7f17641c92fe46d8bf8b475d027de3b2"
                }, {
                    "children": [{"label": "爱民区", "value": "4224f90622714bd78e18cf415582dd26"}, {
                        "label": "东安区",
                        "value": "4eb5a14d0f3b41c98b933101e56c4906"
                    }, {"label": "阳明区", "value": "a3ff556bd4054a22922b37cb2bef3e98"}, {
                        "label": "西安区",
                        "value": "3d82f4b4e3214fa5bcb34301da1f3894"
                    }, {"label": "绥芬河市", "value": "9d82b24088364e95bbeb7d00a1b6e2d2"}, {
                        "label": "宁安市",
                        "value": "018b1b64695c466eb23e2cb857427b9d"
                    }, {"label": "海林市", "value": "bdb45745e72944f19789778b213b2c9a"}, {
                        "label": "穆棱市",
                        "value": "909a7513b2054174ab3447a8f258179b"
                    }, {"label": "林口县", "value": "7531ca9cac1e43f18110673903145f71"}, {
                        "label": "东宁县",
                        "value": "ff2297591be8459b8c0aec50d867cfb7"
                    }, {"label": "其他", "value": "e1627339c20d45b9abeda747e3c9ed8e"}],
                    "label": "牡丹江",
                    "value": "5b9baf8b8812414da5142194745ccf4e"
                }, {
                    "children": [{"label": "向阳区", "value": "146f43571b904a17be3748b1c047a488"}, {
                        "label": "前进区",
                        "value": "13f4c2e1a4ed499da7acb6f49740bd0e"
                    }, {"label": "东风区", "value": "99458d2a3e594ce8ae532a1518e57e78"}, {
                        "label": "郊区",
                        "value": "6cb16115cad142909e00bf6d147ccff6"
                    }, {"label": "同江市", "value": "923fd23c791e47049af4f82101d67daf"}, {
                        "label": "富锦市",
                        "value": "3416e1b6b62d4b108fe7875bd6f25d13"
                    }, {"label": "桦川县", "value": "0369c1a197d24c9db3d24565649d3688"}, {
                        "label": "抚远县",
                        "value": "9d1f8b0b07164782aad17cb9abe77c3d"
                    }, {"label": "桦南县", "value": "b6faa1544e5945d9a637e9cc133aefd7"}, {
                        "label": "汤原县",
                        "value": "ee59a5f1643640d5b7b61995dc6710cc"
                    }, {"label": "其他", "value": "0b0340335280481987cf9026ce584d0b"}],
                    "label": "佳木斯",
                    "value": "2328ade4f0ad47e7a7624ceaa3ae98a1"
                }, {
                    "children": [{"label": "桃山区", "value": "bd22feac6b6b430b883d47dac634170e"}, {
                        "label": "新兴区",
                        "value": "0514d786a13c4a24949b7da163e4d000"
                    }, {"label": "茄子河区", "value": "cc0532f6f94249d6a432012623e3a8d3"}, {
                        "label": "勃利县",
                        "value": "607604924e9741f28666f21477e99f31"
                    }, {"label": "其他", "value": "5955dd36b2c949fca303971af247e7fa"}],
                    "label": "七台河",
                    "value": "bbf374742e1646918a20e3be2c1c9d75"
                }, {
                    "children": [{"label": "爱辉区", "value": "8b748f0378af4213a65478a477f80c99"}, {
                        "label": "北安市",
                        "value": "f95795c3935c4711982ee9849ed44537"
                    }, {"label": "五大连池市", "value": "5d277bc4739d43f8b02bd5c03f46ffda"}, {
                        "label": "逊克县",
                        "value": "391c75e5e8c049e7ba7ef4ea0bc9f817"
                    }, {"label": "嫩江县", "value": "1c0a6e12835d4256b1fe294cb954d73c"}, {
                        "label": "孙吴县",
                        "value": "f5185732f16844c3aa00d7e420444533"
                    }, {"label": "其他", "value": "eea0484bdd914614aec52512b825d984"}],
                    "label": "黑河",
                    "value": "8f0d0ca093e44787af34f8a449b8f805"
                }, {
                    "children": [{"label": "北林区", "value": "6b3c4653724148aaa32dc4af25fd8f70"}, {
                        "label": "安达市",
                        "value": "3f444ff8f47f4642bb9bcbcea5fa7910"
                    }, {"label": "肇东市", "value": "0e94326857a84d29b89d9443a97009c8"}, {
                        "label": "海伦市",
                        "value": "c74dc85bac77496a9f81f729f2c7bf0d"
                    }, {"label": "绥棱县", "value": "c1c4ac8b3485483c8a78ecb20708017e"}, {
                        "label": "兰西县",
                        "value": "3e23bdd0febc456b86562921e53b4161"
                    }, {"label": "明水县", "value": "fbaad3944d2f4a13a8b41ad080f226dc"}, {
                        "label": "青冈县",
                        "value": "2f3bd6a060a64180be36e02204d89142"
                    }, {"label": "庆安县", "value": "e5cb7c06aaef4182bd6d33f141cdba29"}, {
                        "label": "望奎县",
                        "value": "37ff592f3d3d4eadadb0a42ca1dca66b"
                    }, {"label": "其他", "value": "2173f8b31c7b4733b1fd2b337294f789"}],
                    "label": "绥化",
                    "value": "16d72acb9b954c9b9d8bb0921495485b"
                }, {
                    "children": [{"label": "呼玛县", "value": "dbfcc61df8b7431ab4634ee3d418331b"}, {
                        "label": "塔河县",
                        "value": "ae9ec8e2a6f14acc9f1abdfce65ea0e5"
                    }, {"label": "漠河县", "value": "8a3fd7eb8053456fa121ae986864e617"}, {
                        "label": "大兴安岭辖区",
                        "value": "d35c36488aa6443da10f8027f48069d7"
                    }, {"label": "其他", "value": "88844f1177914fbc958422ccb64a704d"}],
                    "label": "大兴安岭地区",
                    "value": "4a288ffb7035468892022171e5bdf644"
                }, {
                    "children": [{"label": "其他", "value": "2a89aabb93094427b0bd03aa06cd1132"}],
                    "label": "其他",
                    "value": "00edc8ea30a44c5ebfcf9c4bff5d7f35"
                }], "label": "黑龙江", "value": "7961a1e32f6341f2b8dff7c933700a6d"
            }, {
                "children": [{
                    "children": [{
                        "label": "黄浦区",
                        "value": "8de8fa69e66449088fe1844b86fca754"
                    }, {"label": "卢湾区", "value": "c8bcc43f6e3143a9847222a20cf99202"}, {
                        "label": "徐汇区",
                        "value": "cb26aa1da9404b458ac3d0642dae0242"
                    }, {"label": "长宁区", "value": "10645ced057f48eba2b433e78f5f5905"}, {
                        "label": "静安区",
                        "value": "15e55b70f06147ffae3024a495b313d6"
                    }, {"label": "普陀区", "value": "e6ee2f8ffdac4551a7a1603529e1cfc9"}, {
                        "label": "闸北区",
                        "value": "0c8034556d6b47abb0ac03a198ae5022"
                    }, {"label": "虹口区", "value": "f68ba43a51e04601b35908847700608f"}, {
                        "label": "杨浦区",
                        "value": "db296d4192c6464a953df7f1a6325291"
                    }, {"label": "宝山区", "value": "35ffdcd5b3114e6b92846af915c23b96"}, {
                        "label": "闵行区",
                        "value": "b730987ddc8b4eb39e35270987b8c573"
                    }, {"label": "嘉定区", "value": "efdd49bde11f44ac9dc4fc1cc7a5f773"}, {
                        "label": "松江区",
                        "value": "a1c2a97fdfe141268931d0b1ee428257"
                    }, {"label": "金山区", "value": "213646cc27024719825eb706a703eb42"}, {
                        "label": "青浦区",
                        "value": "6629316e992f4e8393a472c65760cc13"
                    }, {"label": "南汇区", "value": "8de0fb3158cc4845a942a446cf9e75da"}, {
                        "label": "奉贤区",
                        "value": "009f5e40cb3a405bac92d4c6107960a7"
                    }, {"label": "浦东新区", "value": "c585215a6a244f11926225161155e19f"}, {
                        "label": "崇明县",
                        "value": "7076f6bf70a24126b0f900caf0da47d1"
                    }, {"label": "其他", "value": "2228670194c641059897a4907fc0f44b"}],
                    "label": "上海",
                    "value": "5a144651cf184628af38c7a838d479d5"
                }], "label": "上海", "value": "4ac8cf8a44404bf6b2eeb01a8642efa5"
            }, {
                "children": [{
                    "children": [{
                        "label": "玄武区",
                        "value": "c42443d0040c490fbecda37f0505e26b"
                    }, {"label": "白下区", "value": "cb1113cced1343ada20eefd17b7c13cb"}, {
                        "label": "秦淮区",
                        "value": "f54ccd6390b94bffbdde493a410df6cb"
                    }, {"label": "建邺区", "value": "ebf145137e8342a28d8980bb6111961d"}, {
                        "label": "鼓楼区",
                        "value": "927815bbad7d4cf59e22d24b3c1d76b2"
                    }, {"label": "下关区", "value": "ff2ad6551bb44bd5b06f1c4a793d8a17"}, {
                        "label": "栖霞区",
                        "value": "6c1bc75116564cd9b59e44103eae92b1"
                    }, {"label": "雨花台区", "value": "e41bd7ea078849979e410cf7b7e1eccc"}, {
                        "label": "浦口区",
                        "value": "88bc24d3ca324824aa6cd0f30405b9ba"
                    }, {"label": "江宁区", "value": "3a5c95d30895474199462367d99deebd"}, {
                        "label": "六合区",
                        "value": "d1d221ab9df547f5968db8f56e88fbbf"
                    }, {"label": "溧水县", "value": "3ca0fda128214a7bb9465521e9acca3c"}, {
                        "label": "高淳县",
                        "value": "0a5374f132944f1985a54544c944f6c9"
                    }, {"label": "其他", "value": "481e9e176a944e43a4d24c81928d090c"}],
                    "label": "南京",
                    "value": "d6fe0090fcb24210bfb279d0d4d98417"
                }, {
                    "children": [{"label": "金阊区", "value": "fc9d85692d1240aa80363ea15ed28ec1"}, {
                        "label": "平江区",
                        "value": "944b2d653c184a7ab09024ab01301529"
                    }, {"label": "沧浪区", "value": "154547780b14486fbb3e1c0c55de20f9"}, {
                        "label": "虎丘区",
                        "value": "f6ba5dcf8b2c42e6894935f20af408dd"
                    }, {"label": "吴中区", "value": "49b1f67985fa4c12bfddf8f1911477f0"}, {
                        "label": "相城区",
                        "value": "6b74a174bd1f4f9095c8992ed0b77e06"
                    }, {"label": "常熟市", "value": "8185b27ff6e84dd0ab4faadd7fa8ed94"}, {
                        "label": "张家港市",
                        "value": "7e78295fc2ff40f0be7966acf8ae27e7"
                    }, {"label": "昆山市", "value": "0841c1e39b654adf91a21532a2c1a66c"}, {
                        "label": "吴江市",
                        "value": "32c5f389cdd548b98b603b6801cd842f"
                    }, {"label": "太仓市", "value": "cf792ce2798645e4b9ddd3f46a794988"}, {
                        "label": "其他",
                        "value": "1e989348cdf64ebdb973d941e4c963c5"
                    }], "label": "苏州", "value": "7036f56521fd4005b26f358fe1c04780"
                }, {
                    "children": [{"label": "崇安区", "value": "3e758349d12e486c9c2110f9b1a15ee2"}, {
                        "label": "南长区",
                        "value": "111b58b507954671b44ddd5f507fe3bc"
                    }, {"label": "北塘区", "value": "15ea113f7e0941bdb4c10f8f75394974"}, {
                        "label": "滨湖区",
                        "value": "036b3f22c7e3454ab6d9aa257f5278da"
                    }, {"label": "锡山区", "value": "56c01efe4d5b400ab1b8ca6fe5ff63aa"}, {
                        "label": "惠山区",
                        "value": "a6c050f038ab4560b6d8999d356c2b87"
                    }, {"label": "江阴市", "value": "b750737a9dc34b1c832472b20e4f204b"}, {
                        "label": "宜兴市",
                        "value": "38ec817d331c40c69076e199fc9372cd"
                    }, {"label": "其他", "value": "acd59b565519415dba33f25e21974055"}],
                    "label": "无锡",
                    "value": "25ce55286b24424889e6f8ec20c4e63e"
                }, {
                    "children": [{"label": "钟楼区", "value": "4249a2e3a18844629a05f1ef104adf90"}, {
                        "label": "天宁区",
                        "value": "24cf8de539274420ad4a91d0d94d8da0"
                    }, {"label": "戚墅堰区", "value": "05aa84f18dab4b0cbf51535579007234"}, {
                        "label": "新北区",
                        "value": "5388619d7f6947ce8d49fdc2ee5ca9b9"
                    }, {"label": "武进区", "value": "6e8b8ccafe8f48049594b5227737e23d"}, {
                        "label": "金坛市",
                        "value": "47061c05b90c4f8bbd3a28f0299a46c9"
                    }, {"label": "溧阳市", "value": "7e220ba085a543e6bea31d88f58386e1"}, {
                        "label": "其他",
                        "value": "28e23c48a50246e7b1e7a448547ca389"
                    }], "label": "常州", "value": "3064c1c1adb346a0b27afb1395bf7366"
                }, {
                    "children": [{"label": "京口区", "value": "8d1aa575280e4c3d8af130b320c3c38e"}, {
                        "label": "润州区",
                        "value": "ca63caa3562f42458a209dbbac23717f"
                    }, {"label": "丹徒区", "value": "21d6ed7d1bcf4b5db2eec69aef31af8f"}, {
                        "label": "丹阳市",
                        "value": "4d3f1a8274ff4c978870307f380b5ccc"
                    }, {"label": "扬中市", "value": "1034232e661c44f8b46acd9d9b343808"}, {
                        "label": "句容市",
                        "value": "eb0654e75f5646b198165d6730709e51"
                    }, {"label": "其他", "value": "5ee7dc0e11084e4786fe54c67aa51092"}],
                    "label": "镇江",
                    "value": "e39570a94b7b45f7bf35366d6d49c2be"
                }, {
                    "children": [{"label": "崇川区", "value": "006c001a5498442d8acf923e4c89b366"}, {
                        "label": "港闸区",
                        "value": "1c440c1efc3f4441b7a567d846354a61"
                    }, {"label": "通州市", "value": "83efee7365034566b90b52be24c056c9"}, {
                        "label": "如皋市",
                        "value": "d035da04c8cd46cfb6284c523ddcdd5e"
                    }, {"label": "海门市", "value": "556db120d9d04f3fbb1c920e9e439074"}, {
                        "label": "启东市",
                        "value": "8e4bf8d534fa436e8a73fa3b2bf27092"
                    }, {"label": "海安县", "value": "7103afa4d24c4e8593064944ef3d9408"}, {
                        "label": "如东县",
                        "value": "b97d30eb09a941faafefe6e4e324de4b"
                    }, {"label": "其他", "value": "dec03eadc7d44ea1b9a02e3ccb1497a0"}],
                    "label": "南通",
                    "value": "344357334bc74bcd862a1db3457be81f"
                }, {
                    "children": [{"label": "海陵区", "value": "37578ac07d09426a8b276eaf6d243917"}, {
                        "label": "高港区",
                        "value": "0c82dd5baa68487580fd5e29c89613b4"
                    }, {"label": "姜堰市", "value": "8ee392f5070e45628a854ba8c8e25ca2"}, {
                        "label": "泰兴市",
                        "value": "3b0510a658ce4b78b2aeb378051a96e5"
                    }, {"label": "靖江市", "value": "4732dc00358847f0b1d687e357417c58"}, {
                        "label": "兴化市",
                        "value": "e746ee99617f48a09a6a708e586a0937"
                    }, {"label": "其他", "value": "b256052554dd428bb72f6d65f10d0d69"}],
                    "label": "泰州",
                    "value": "4900f5ef55254ceea61c17c579b8f6ab"
                }, {
                    "children": [{"label": "广陵区", "value": "9c9a7f3335924222a5c57d43a734989f"}, {
                        "label": "维扬区",
                        "value": "5e32313eb96d47f19b9fadfe5d59942b"
                    }, {"label": "邗江区", "value": "dd7c28ed7f8d442cba3b9be72905cb9d"}, {
                        "label": "江都市",
                        "value": "c68e765059434c2489c778c00b5fcbee"
                    }, {"label": "仪征市", "value": "1b4f649efd6247b4a9b11756af4d8c34"}, {
                        "label": "高邮市",
                        "value": "6768499cf98345c4a0c6f58603fd8c4c"
                    }, {"label": "宝应县", "value": "8cac5bd46b524b45a668b26662ffd088"}, {
                        "label": "其他",
                        "value": "a9859c4b149a4dc8bc54bb3ed3dec0c4"
                    }], "label": "扬州", "value": "e9095f90c5a7409f9fd3cde3a991e6d7"
                }, {
                    "children": [{"label": "亭湖区", "value": "543f84bcb1d94bb59a9f5a014643590c"}, {
                        "label": "盐都区",
                        "value": "a79d247d2bfe4971961def2f4eb7a298"
                    }, {"label": "大丰市", "value": "095a1b5ebddf49e0bb6f918f326f1eea"}, {
                        "label": "东台市",
                        "value": "d1cb3e2ca9454d68885ccb098c5401fe"
                    }, {"label": "建湖县", "value": "f8808013309d4e07ab2a5975311d5677"}, {
                        "label": "射阳县",
                        "value": "ff30a8ad0ae1415583a5e051f5d7aa50"
                    }, {"label": "阜宁县", "value": "10967d74421c49a7afed6689dab56583"}, {
                        "label": "滨海县",
                        "value": "beb2a8d6acf54b3e9c432b90057ced33"
                    }, {"label": "响水县", "value": "5a3ac2345c554e81bd32ec8818bbb0bd"}, {
                        "label": "其他",
                        "value": "5302114408c64b5ca10207883b4a28c5"
                    }], "label": "盐城", "value": "da6346e4a8a04dda8526808704ceb9ab"
                }, {
                    "children": [{"label": "新浦区", "value": "5e3eac45ae9849c7b97808230a4c0cc4"}, {
                        "label": "海州区",
                        "value": "bf5bd7bdf9ec43e182b9582640ad7c9b"
                    }, {"label": "连云区", "value": "5870209666c644e9a623cd8a0f8cddd2"}, {
                        "label": "东海县",
                        "value": "c21fae3f64fc434b95d63c7fc65e6fce"
                    }, {"label": "灌云县", "value": "93a6a4d79e514c129976e96e91e46882"}, {
                        "label": "赣榆县",
                        "value": "7d6bf612e8e440c88644ab3303cc6e2f"
                    }, {"label": "灌南县", "value": "1ebf462c847346408f3134b5b45a193b"}, {
                        "label": "其他",
                        "value": "96a3567eacb743e9b579ccfb7a7a7b38"
                    }], "label": "连云港", "value": "01cb18ff28bd4675b16c836b8743516a"
                }, {
                    "children": [{"label": "云龙区", "value": "935c39fe52ae479493989f8997988886"}, {
                        "label": "鼓楼区",
                        "value": "cfa70fc19bae4841aa1b3b955eaf2bdd"
                    }, {"label": "九里区", "value": "2870aa036e1248b8adce4c0d679bb52c"}, {
                        "label": "泉山区",
                        "value": "28ebec7175804d74b66e58c4a629701b"
                    }, {"label": "贾汪区", "value": "877c3eda2ec247288ef61dab27e94464"}, {
                        "label": "邳州市",
                        "value": "b054acafff89470a9a2cc62ac83f0f90"
                    }, {"label": "新沂市", "value": "1c0549dc55a94a03acb1a270f835a5ec"}, {
                        "label": "铜山县",
                        "value": "bf10c0621bc142e1858ab71d27fc13ec"
                    }, {"label": "睢宁县", "value": "61a04766376e44eb8bd24a03064b69ca"}, {
                        "label": "沛县",
                        "value": "83e6a65da2794fc4a115bd274900f237"
                    }, {"label": "丰县", "value": "625719c86b0a4c41b321654fa473d172"}, {
                        "label": "其他",
                        "value": "018263ca59004b4ba236e3f4882f8810"
                    }], "label": "徐州", "value": "847ef1c6b16749d4aa34f0a7b2547c04"
                }, {
                    "children": [{"label": "清河区", "value": "1a5e25213a454a3f983bb72fc9352a68"}, {
                        "label": "清浦区",
                        "value": "4b4d695d994b48ada7205fd7cd35cd96"
                    }, {"label": "楚州区", "value": "bd6034fd05de4853b838e58cd106a426"}, {
                        "label": "淮阴区",
                        "value": "d8722df2027343ce897ffe207cb250e1"
                    }, {"label": "涟水县", "value": "7493d96287af4c03b521848e7b5503db"}, {
                        "label": "洪泽县",
                        "value": "fe2bb6fecdc64b0c82dca6afae0e2036"
                    }, {"label": "金湖县", "value": "92a107a5fabc4f68a8b8556eb0c7410e"}, {
                        "label": "盱眙县",
                        "value": "029100987ab34828a6219e6ca0d53a34"
                    }, {"label": "其他", "value": "174f24a7d1b64eb5b907afaf894169ce"}],
                    "label": "淮安",
                    "value": "69ea115fd64a44fa8815ef4cffffce09"
                }, {
                    "children": [{"label": "宿城区", "value": "ce4857f7db0a43338dcb4c299a35b79d"}, {
                        "label": "宿豫区",
                        "value": "f8e12babc6394695975a1dc85d3ad6b1"
                    }, {"label": "沭阳县", "value": "cecd4dcf87b34cf5b08b02f48ae3b28c"}, {
                        "label": "泗阳县",
                        "value": "eeea0660ded443c0be34cae6526079b5"
                    }, {"label": "泗洪县", "value": "d51864708b374416869e79122fe25fd2"}, {
                        "label": "其他",
                        "value": "cf5c358f3bdf462fbf2ae84c78b5ae0d"
                    }], "label": "宿迁", "value": "ad6287fb956645e7a4b3e81077bd5245"
                }, {
                    "children": [{"label": "其他", "value": "3c1f55ae648c4b5da81384212e341c38"}],
                    "label": "其他",
                    "value": "9b252808a3554c5cad4c2060ad6b338b"
                }], "label": "江苏", "value": "e81e60d7a80447e58d9de7859607062d"
            }, {
                "children": [{
                    "children": [{
                        "label": "拱墅区",
                        "value": "bcb1c1cbce814ae38b2ddc7f54e4599d"
                    }, {"label": "西湖区", "value": "d959d92abf604153ab07ffc6ecd3daf6"}, {
                        "label": "上城区",
                        "value": "0ce11da7994644ed85232a8ae32f4b33"
                    }, {"label": "下城区", "value": "819328849e9d4954987eb6b1e2841386"}, {
                        "label": "江干区",
                        "value": "67f9374f11494fd5ba297b37acf4a67b"
                    }, {"label": "滨江区", "value": "3b67c65ed1bc4af59b54870396c061a3"}, {
                        "label": "余杭区",
                        "value": "c1cdf6fb46cb47ae8fd92b27bf3c0c3d"
                    }, {"label": "萧山区", "value": "115ee9615cb74db19e9905dc3bd38b23"}, {
                        "label": "建德市",
                        "value": "affa932e16514337b20a0d70db59651b"
                    }, {"label": "富阳市", "value": "08fa546310fc496cb79c6b15141f1634"}, {
                        "label": "临安市",
                        "value": "deb1cc8528b043ea941e0cac20aac352"
                    }, {"label": "桐庐县", "value": "9960085d60854a75b23998827eba4af7"}, {
                        "label": "淳安县",
                        "value": "9f0fafb56d0e4a83a82b720dfd34309b"
                    }, {"label": "其他", "value": "ca5105fa2d2c4b3db2fef4983ed11893"}],
                    "label": "杭州",
                    "value": "ea4f9ec15c95409a87d06a6f89a311aa"
                }, {
                    "children": [{"label": "海曙区", "value": "013dfb75d2db477fb704f52312ec631a"}, {
                        "label": "江东区",
                        "value": "5d9f17f4a3fb44c5912c37efbc70a1f3"
                    }, {"label": "江北区", "value": "b91915a63cef4b10b2315b7966112722"}, {
                        "label": "镇海区",
                        "value": "761e0658d4c24aea8e1a3a55009e2dda"
                    }, {"label": "北仑区", "value": "ce5d039853d7417d9e027c5518ba5a55"}, {
                        "label": "鄞州区",
                        "value": "e003e6dbeebb4c159366236e19b73473"
                    }, {"label": "余姚市", "value": "b80c229c2b9f4f0ea241b46c387988c4"}, {
                        "label": "慈溪市",
                        "value": "da1e954eb72544c79ffc44fc33e8739b"
                    }, {"label": "奉化市", "value": "225d9d47cba2488fa6ddfe7540dc2b37"}, {
                        "label": "宁海县",
                        "value": "7267f8c7926e423d86e555eea178bab8"
                    }, {"label": "象山县", "value": "ab14df8bbe884f2f914579f0711c2ef3"}, {
                        "label": "其他",
                        "value": "bd61c186bb774380afea8c844934c703"
                    }], "label": "宁波", "value": "c8dc59f8f5414dd5932b11d3809e6bf0"
                }, {
                    "children": [{"label": "鹿城区", "value": "cfb78494de4648aa9848c840f4fb8bcb"}, {
                        "label": "龙湾区",
                        "value": "191933fe111943898449b215cb4e56e8"
                    }, {"label": "瓯海区", "value": "8d1e1152d4c545cebb6df3fddbc19405"}, {
                        "label": "瑞安市",
                        "value": "fe3d6b2fd36946ca9b118af97c6c2781"
                    }, {"label": "乐清市", "value": "86f32a0204bd41fa987b93c5ce5fa4f4"}, {
                        "label": "永嘉县",
                        "value": "b62a6b46b799442fae30ba5579d90a96"
                    }, {"label": "洞头县", "value": "2a805d50423341aea19fa55627205cd3"}, {
                        "label": "平阳县",
                        "value": "7feae777a92a4025b59359a4ea0ff9db"
                    }, {"label": "苍南县", "value": "fbf3d485d05c40b3b130c8d44aafce99"}, {
                        "label": "文成县",
                        "value": "9609271f702844bd937e276d75832f2f"
                    }, {"label": "泰顺县", "value": "d434018de5fd4b52a44bcdd86b5ccfa9"}, {
                        "label": "其他",
                        "value": "6ba3854c6c574d3588a9a29a64a3fee0"
                    }], "label": "温州", "value": "e3a8fc892daf441c8dd7bde35b440677"
                }, {
                    "children": [{"label": "秀城区", "value": "c3b10843679549ff9b386cbd257e2d90"}, {
                        "label": "秀洲区",
                        "value": "f1b49556a5804cb891188e74b3ab8444"
                    }, {"label": "海宁市", "value": "40c3339aaf144e7d97103d916fc18e98"}, {
                        "label": "平湖市",
                        "value": "1852c82a6e3b4a679fecd9e1305bd50a"
                    }, {"label": "桐乡市", "value": "48f1444144394a35ab6e8b9bb2e78d39"}, {
                        "label": "嘉善县",
                        "value": "93b0cfddb9d24ab1b012c2286a446f7c"
                    }, {"label": "海盐县", "value": "5e7ffde953cf4ab486a33a0aaf4b6308"}, {
                        "label": "其他",
                        "value": "3e557b3919b84548bb6a77c573c28788"
                    }], "label": "嘉兴", "value": "6a31a6d3966e49b3a4729340571fbc35"
                }, {
                    "children": [{"label": "吴兴区", "value": "14f009016ce8413e9e2e039dcd69418a"}, {
                        "label": "南浔区",
                        "value": "c3da80e168b5466ea7331800743defb3"
                    }, {"label": "长兴县", "value": "a9404e08fce641e3a61a69876528b58c"}, {
                        "label": "德清县",
                        "value": "d7e7498edc4549ce8983c82252ed4a44"
                    }, {"label": "安吉县", "value": "c9e686ed13564aaba1401a423ed8724a"}, {
                        "label": "其他",
                        "value": "dcc4ca55622147e5961a89d8c784d095"
                    }], "label": "湖州", "value": "fa70b166e1af4e4d9457dc43c43172b3"
                }, {
                    "children": [{"label": "越城区", "value": "22961e5d071746f09a339ed783f002f8"}, {
                        "label": "诸暨市",
                        "value": "4c8e9fe82e8f491680779e7b3beb02ce"
                    }, {"label": "上虞市", "value": "83f82ce9e94f41b9bc70050c6fd7b4a9"}, {
                        "label": "嵊州市",
                        "value": "f6fb2e8701df41dcb3d511f2440c7728"
                    }, {"label": "绍兴县", "value": "220138e74eab435bada6b65ea3323ddd"}, {
                        "label": "新昌县",
                        "value": "b5062853c619409a8cd7ba3671ab2d20"
                    }, {"label": "其他", "value": "aa7a714c100744788f3e78102b452252"}],
                    "label": "绍兴",
                    "value": "4a2c61e43b6e42f088b1f79f44599277"
                }, {
                    "children": [{"label": "婺城区", "value": "50da12725fc64096ac22a1c9cd0ca598"}, {
                        "label": "金东区",
                        "value": "45e8b37273954fc19724a1ac1c0fd8f1"
                    }, {"label": "兰溪市", "value": "556ae3653c2c4b57b468311caf11992c"}, {
                        "label": "义乌市",
                        "value": "ce986457bc1948e087494626c0e7a012"
                    }, {"label": "东阳市", "value": "645a5874eae74e11ab39aa15737efdf6"}, {
                        "label": "永康市",
                        "value": "a57b9540c06b4bd596c7bec840a2e5d4"
                    }, {"label": "武义县", "value": "4b5fc981a0de4fe4802ea192e3bff6e1"}, {
                        "label": "浦江县",
                        "value": "dfbe3e1a42cd497082a49adaef47eaac"
                    }, {"label": "磐安县", "value": "9541c53ebbef4710b2b2373a5267ad6f"}, {
                        "label": "其他",
                        "value": "e7f4e20169be4379af4866c5f41aa63e"
                    }], "label": "金华", "value": "661647becaef453ca58e0469eda1ceb0"
                }, {
                    "children": [{"label": "柯城区", "value": "a723a9a752404ca493e13113d457ae2d"}, {
                        "label": "衢江区",
                        "value": "ffe2dd18ccdd4c05a190a5f9864d8427"
                    }, {"label": "江山市", "value": "aa2d4668f5704bc88d131fdfbb60c749"}, {
                        "label": "龙游县",
                        "value": "7e60846e88a846ca9478a88f023b1298"
                    }, {"label": "常山县", "value": "98cc09ccd22849b49ac5fa147219960e"}, {
                        "label": "开化县",
                        "value": "36682d52c43c419aab5db6c8a0d83dbe"
                    }, {"label": "其他", "value": "452c3370e6844d43bbef61d12a098659"}],
                    "label": "衢州",
                    "value": "9442df83728e4d60b7c86563370f7841"
                }, {
                    "children": [{"label": "定海区", "value": "4ca42b0534264a8f9e34c0532f2bdaaf"}, {
                        "label": "普陀区",
                        "value": "248c3e627583415faecc1b7b2f91bf27"
                    }, {"label": "岱山县", "value": "4430fb76d41746c483ec2a06545ba57e"}, {
                        "label": "嵊泗县",
                        "value": "348e535309464903b98ee2376aaa3d2e"
                    }, {"label": "其他", "value": "79b683429c864dd4a335bef441e84c26"}],
                    "label": "舟山",
                    "value": "561d1193a2444e75b63dc14d262fde08"
                }, {
                    "children": [{"label": "椒江区", "value": "6e3968194e024e5f874f63c2e4dc207c"}, {
                        "label": "黄岩区",
                        "value": "0bd3ca54b86247fe8e047a43a1f4ca7a"
                    }, {"label": "路桥区", "value": "5c7d966ebf10407f83a6886e2860b9fc"}, {
                        "label": "临海市",
                        "value": "1c61840aef01413496695b124f3526f8"
                    }, {"label": "温岭市", "value": "8668b06c998c4fa3aa93454f010a5425"}, {
                        "label": "玉环县",
                        "value": "2022bb796b6e4f12ae114093c6d351b0"
                    }, {"label": "天台县", "value": "ff5a5f0395f7404b81a07ee6a2ee4448"}, {
                        "label": "仙居县",
                        "value": "abd467a75c6d46e4b21402b13f556d6b"
                    }, {"label": "三门县", "value": "d1fac13a7e5349fe8e0e673d328ddc85"}, {
                        "label": "其他",
                        "value": "7775edf8b5bf4ea2997be6c22cd1a143"
                    }], "label": "台州", "value": "dbaa4e64445a4c18ace5f79ba2c1f7bf"
                }, {
                    "children": [{"label": "莲都区", "value": "b6d7176250de4210a0232758e9479145"}, {
                        "label": "龙泉市",
                        "value": "42fc27d6fddf434bada067b06fef36b3"
                    }, {"label": "缙云县", "value": "5b9d4344ce3343ec85d67b41537c230c"}, {
                        "label": "青田县",
                        "value": "38ccdfd0c67e4e7089f3d8ebaaa8fcd5"
                    }, {"label": "云和县", "value": "3b62859ecb2f4a4bb6f86d86d8f8e6cc"}, {
                        "label": "遂昌县",
                        "value": "cc42aa841fb94289b07cb23ab85eb2fb"
                    }, {"label": "松阳县", "value": "379c736382f947faac740b248868ab78"}, {
                        "label": "庆元县",
                        "value": "baeb041d79c844dd9f50cc873c8f5dfb"
                    }, {"label": "景宁畲族自治县", "value": "8f29421210eb4cfa8257821519a0245f"}, {
                        "label": "其他",
                        "value": "2b60962003574b4bb30ee21d47553fc5"
                    }], "label": "丽水", "value": "ab0e52eb5dbd41e891969c5464271016"
                }, {
                    "children": [{"label": "其他", "value": "f0bd74c27da24f2dab4a24cd538b84d7"}],
                    "label": "其他",
                    "value": "bf7a424396414455bacc0e84232792c7"
                }], "label": "浙江", "value": "1f36d44d2aed417a85bca7f5597bb077"
            }, {
                "children": [{
                    "children": [{
                        "label": "庐阳区",
                        "value": "4e2fa27b46b14993ab220f3178a2c70b"
                    }, {"label": "瑶海区", "value": "2ff6dff5680a48f18fa682602348f79b"}, {
                        "label": "蜀山区",
                        "value": "03caff41e08744ca92973d9eac0b569b"
                    }, {"label": "包河区", "value": "5b7bc3b39e3145bea0df4aae35068615"}, {
                        "label": "长丰县",
                        "value": "c8c594135a5d439895de28e0158f7e39"
                    }, {"label": "肥东县", "value": "8e12e98d16544884814c6de4dc262e3f"}, {
                        "label": "肥西县",
                        "value": "6b83e444e9e54e3eb8cafe8c4279cbff"
                    }, {"label": "其他", "value": "6826485f017848e38424d2d9cbbbcb84"}],
                    "label": "合肥",
                    "value": "1831e33f4d3941c1ad2997b70db99996"
                }, {
                    "children": [{"label": "镜湖区", "value": "ebb7e0e16a694bd89520b5d1d344950b"}, {
                        "label": "弋江区",
                        "value": "92b433bf107345bdb69ffabf1c7ec982"
                    }, {"label": "鸠江区", "value": "9f2be7428bc84c3b87e2d58cd10184fc"}, {
                        "label": "三山区",
                        "value": "10b8918289414a3abd4e2406a798bded"
                    }, {"label": "芜湖县", "value": "274911a870ab41f481f8dee661c65d96"}, {
                        "label": "南陵县",
                        "value": "f54989496f10486c89d4229b6c53ce35"
                    }, {"label": "繁昌县", "value": "9e326d0c2825491ea1380926934055f5"}, {
                        "label": "其他",
                        "value": "a74e42110863438abbc55fbe8aa81b37"
                    }], "label": "芜湖", "value": "080093103fa9470ebbecbdb53458f41a"
                }, {
                    "children": [{"label": "蚌山区", "value": "43d3b011891b4d98aa8f939303fe4f10"}, {
                        "label": "龙子湖区",
                        "value": "be591b7fec354c52beb9fd2deb6b6a53"
                    }, {"label": "禹会区", "value": "8a203296b2674ad2a7bddf4d85ba5568"}, {
                        "label": "淮上区",
                        "value": "d9d97f54c28c4e2ca7d0ae28160d3560"
                    }, {"label": "怀远县", "value": "d4950d23d6e1406a95dcab9d5c5dd0b7"}, {
                        "label": "固镇县",
                        "value": "ff5964daf21b427783039898c5419f43"
                    }, {"label": "五河县", "value": "1e23a7e7bd564dbfa02e127766832b59"}, {
                        "label": "其他",
                        "value": "1c39f010445f4644b5542bc91c0c3cea"
                    }], "label": "蚌埠", "value": "fdd14743234b4c4a98c2f7dc54d27984"
                }, {
                    "children": [{"label": "田家庵区", "value": "1aea25eed4504a86a033129d7a20227c"}, {
                        "label": "大通区",
                        "value": "4a3a88565f8e4d059607128567c8817f"
                    }, {"label": "谢家集区", "value": "afe3946c27924a8b96253321d99c5a40"}, {
                        "label": "八公山区",
                        "value": "659e083624c14e298f6b6bb0344edf20"
                    }, {"label": "潘集区", "value": "c8468645466145b4b7f466ff0e336774"}, {
                        "label": "凤台县",
                        "value": "461e750f20d94b6984d2e3f12a6455cb"
                    }, {"label": "其他", "value": "a06bed1628864b3aa06c6b2c5ed57bc6"}],
                    "label": "淮南",
                    "value": "59571e08c9fc480cbf93e1012094e742"
                }, {
                    "children": [{"label": "雨山区", "value": "13bac61dc80f4638b1a445f1e587ed81"}, {
                        "label": "花山区",
                        "value": "5c2f6d7e02344a35be95e5272eddfe8d"
                    }, {"label": "金家庄区", "value": "662f347acb3d463b9a0c8d03a7073b3b"}, {
                        "label": "当涂县",
                        "value": "343d5ed205344debbee716d214b33f81"
                    }, {"label": "其他", "value": "68d0b7f4bf084fb4bd0ab2da2f860ebe"}],
                    "label": "马鞍山",
                    "value": "73f39b5ae65940bab45244697cdeff0b"
                }, {
                    "children": [{"label": "相山区", "value": "1740f1f2db3143f597037c01e10d88d6"}, {
                        "label": "杜集区",
                        "value": "4a358436f94d441da83fcb7a43bc0478"
                    }, {"label": "烈山区", "value": "4d66748252ce4bb98c083e295506b253"}, {
                        "label": "濉溪县",
                        "value": "0067eee902aa4a97950d260db29aea63"
                    }, {"label": "其他", "value": "7a169c52a5ad46668339d458807d1bbe"}],
                    "label": "淮北",
                    "value": "72b97969325c4e32b40b97e418f98f00"
                }, {
                    "children": [{"label": "铜官山区", "value": "893d422e1b6a47259df75fe589bc862b"}, {
                        "label": "狮子山区",
                        "value": "2272ee8e79fe481590c9d1f354e030fe"
                    }, {"label": "郊区", "value": "72627002e4f94010aa02935852fe3a23"}, {
                        "label": "铜陵县",
                        "value": "60fcf6cbc0534c16a4a053439da6bfbd"
                    }, {"label": "其他", "value": "a2a6d4feb6c146e2b2b15f90e67e76bf"}],
                    "label": "铜陵",
                    "value": "aa745afef57b42dba852cccdd7a966b9"
                }, {
                    "children": [{"label": "迎江区", "value": "abd2cae8e7b74fc48dd5b58725ed3af1"}, {
                        "label": "大观区",
                        "value": "1aadf73772354fd286d320d9223b1136"
                    }, {"label": "宜秀区", "value": "6c216a558daa4fd7933a40b3bfa534da"}, {
                        "label": "桐城市",
                        "value": "08f50fbf22f54a8e9cec27b8370ee089"
                    }, {"label": "宿松县", "value": "82a75f00c26a4a7588ba918991c9210f"}, {
                        "label": "枞阳县",
                        "value": "26f4bf7e1e4b42cd93ac28f5289f279a"
                    }, {"label": "太湖县", "value": "68c766611ce44efbb1f33d130c645d02"}, {
                        "label": "怀宁县",
                        "value": "70eaf44e063b4a169c1da5c0be755399"
                    }, {"label": "岳西县", "value": "613201b6b33544889996aadcc28de769"}, {
                        "label": "望江县",
                        "value": "4a57a846f2e64defb23a8f258b666884"
                    }, {"label": "潜山县", "value": "a41678326ea447c9be66d850df0b5177"}, {
                        "label": "其他",
                        "value": "79d0bb057dfa4bbb895cc6ef53e92790"
                    }], "label": "安庆", "value": "ecfc15006a744482a5c838afcb838c40"
                }, {
                    "children": [{"label": "屯溪区", "value": "d8493a33ba794db68ad30cbfff15bc0b"}, {
                        "label": "黄山区",
                        "value": "60bc94ffdfce4db68551d5e9b9fb04ef"
                    }, {"label": "徽州区", "value": "b01b26c4d67241248bd8715e0205d680"}, {
                        "label": "休宁县",
                        "value": "2298cb507ee34b7fad6d7a03def562e5"
                    }, {"label": "歙县", "value": "244b0e42135548eab6370abec3fd60f4"}, {
                        "label": "祁门县",
                        "value": "30c4abe24790480eb8dc162d76544db0"
                    }, {"label": "黟县", "value": "37e0471355554c96b947ce63a986282c"}, {
                        "label": "其他",
                        "value": "3b8c881b19e04abca773cc35bdc8727b"
                    }], "label": "黄山", "value": "14491a306dda46a2b9d19e8340aa7376"
                }, {
                    "children": [{"label": "琅琊区", "value": "7ef43da1f14e4061b4d87993a05c026b"}, {
                        "label": "南谯区",
                        "value": "0161343ea41f459d9b9230def803697a"
                    }, {"label": "天长市", "value": "51676597dcd7401c951c1c4264074246"}, {
                        "label": "明光市",
                        "value": "711c0961d8c54314b66d90814820ca21"
                    }, {"label": "全椒县", "value": "650c97692b9b48619e5aba29b9fc211d"}, {
                        "label": "来安县",
                        "value": "ad6f4a3d8f1b4708b123d3fc1755620f"
                    }, {"label": "定远县", "value": "c54e913544e0497abb32ef20501a4513"}, {
                        "label": "凤阳县",
                        "value": "dc6fd79bde4e4da183bed18c0640709d"
                    }, {"label": "其他", "value": "1b2db11be9934fd8bec18525ea2361c0"}],
                    "label": "滁州",
                    "value": "b6452b58bf7c462aa99e5d475527adf3"
                }, {
                    "children": [{"label": "颍州区", "value": "c310a18f7a8747ec93e093ed43358a6f"}, {
                        "label": "颍东区",
                        "value": "a1386b757881477ab38aaedc1e509f93"
                    }, {"label": "颍泉区", "value": "6d58f7c2455d4b5aa067d02c8955aa9e"}, {
                        "label": "界首市",
                        "value": "57b04234be2f40178c034a6cc27ab8c4"
                    }, {"label": "临泉县", "value": "ed03daf4c8054e1ea1b219822eba1986"}, {
                        "label": "颍上县",
                        "value": "5104821087cc401e9fa1fd2cd68c348d"
                    }, {"label": "阜南县", "value": "8b504c9233674e368e40e9c198b0c7e7"}, {
                        "label": "太和县",
                        "value": "48707e80c1c64af7b74a24e5ccc1ccc2"
                    }, {"label": "其他", "value": "8ca68721312b4c00a5edc19d3338e947"}],
                    "label": "阜阳",
                    "value": "72c396a1c8774127947567d4fc4203dd"
                }, {
                    "children": [{"label": "埇桥区", "value": "500e925cce1047a8b2c995440d13e607"}, {
                        "label": "萧县",
                        "value": "aaee75397a374bef8020816d6811346f"
                    }, {"label": "泗县", "value": "054a0b921ec94c24bd5d4608d3a33c0f"}, {
                        "label": "砀山县",
                        "value": "01fb137be5db413980c0775bf9b6b7ab"
                    }, {"label": "灵璧县", "value": "59460df7bf4e47489559a22bcffcc6cb"}, {
                        "label": "其他",
                        "value": "0b698f7bfa834a06879ef6fd7b263a02"
                    }], "label": "宿州", "value": "5c40610cec8f49c78c2f2433a912d879"
                }, {
                    "children": [{"label": "居巢区", "value": "31241f488e46419fa81686cd97d2d2ff"}, {
                        "label": "含山县",
                        "value": "b0ee56adfbe04b23b6b77eae358ad960"
                    }, {"label": "无为县", "value": "4a0c0b324e1545b888c6487fddb45b9c"}, {
                        "label": "庐江县",
                        "value": "cbd33dd23ae14d88b80639873623ba08"
                    }, {"label": "和县", "value": "c1a3776a923f4dcea876c58a111a9b03"}, {
                        "label": "其他",
                        "value": "34544f15f3f145aa8cdf8392d35a7f42"
                    }], "label": "巢湖", "value": "70cde9036d0b44d3ae54caf3858246ca"
                }, {
                    "children": [{"label": "金安区", "value": "e41cbb34c7b84e5693f4068c064e5e67"}, {
                        "label": "裕安区",
                        "value": "24d6e078f0214d0ba790111b1d56ffd6"
                    }, {"label": "寿县", "value": "76ec24df6b7948869cc5288bd018eb4a"}, {
                        "label": "霍山县",
                        "value": "6abfe94e64304c8995c1a736b3643380"
                    }, {"label": "霍邱县", "value": "e88a7a4a5b10453e9ad51a82c5107599"}, {
                        "label": "舒城县",
                        "value": "c09dad8980224e198b1f1352e68dde49"
                    }, {"label": "金寨县", "value": "0bdb3b4b1dc246aebfb9becc4b9ce8b6"}, {
                        "label": "其他",
                        "value": "f8da808884c84d7d8c125a62fab39d1a"
                    }], "label": "六安", "value": "2ca06726ea3f45c9bd3e1145290c89ee"
                }, {
                    "children": [{"label": "谯城区", "value": "1e8cca4b2dbc480abbd80197b84c116e"}, {
                        "label": "利辛县",
                        "value": "7320fb1a5c3d405cadea0a462a1467db"
                    }, {"label": "涡阳县", "value": "3560d128d14047be9c7611884e0c2885"}, {
                        "label": "蒙城县",
                        "value": "de677261c1d04e719dff910951187f1d"
                    }, {"label": "其他", "value": "2ee28fe95bef4cb284778c6f124da633"}],
                    "label": "亳州",
                    "value": "f24057e2d9fe475891c63bea3951e690"
                }, {
                    "children": [{"label": "贵池区", "value": "576334152086464797eea089fee12b9a"}, {
                        "label": "东至县",
                        "value": "a8d62a0c53f84b4886a5f3569513934a"
                    }, {"label": "石台县", "value": "584a27ea21f54b568385e4e1d75befc9"}, {
                        "label": "青阳县",
                        "value": "c975fd3088f34eb1999612d2b64c8fa2"
                    }, {"label": "其他", "value": "ed25bcc6edcb4ea59b08361fddcd1c8d"}],
                    "label": "池州",
                    "value": "2fc90c4e5b18493e8154bff6813c8e9f"
                }, {
                    "children": [{"label": "宣州区", "value": "88781c532829474dbdfb485f7f960928"}, {
                        "label": "宁国市",
                        "value": "8f076b976fb64b9d85d2f5ed3c1a3e36"
                    }, {"label": "广德县", "value": "3af0f28e6b26450faab827e5981a3611"}, {
                        "label": "郎溪县",
                        "value": "dddfe2201a44432291ba8d4f26ae243b"
                    }, {"label": "泾县", "value": "f77f1e0d2fba41258693490b217f4d05"}, {
                        "label": "旌德县",
                        "value": "1f0f4589e3424483b3912e014a8648bd"
                    }, {"label": "绩溪县", "value": "5cf23975c32741e9b9c8126cbf9eeaee"}, {
                        "label": "其他",
                        "value": "f1b57fcd85b845eab64df63282d0fd9c"
                    }], "label": "宣城", "value": "9571066883324fa19380c26784f3bf18"
                }, {
                    "children": [{"label": "其他", "value": "c9d6643c089c431d87c7a038d6ba28e7"}],
                    "label": "其他",
                    "value": "9f123bca84b34b42bd8097837f6d9a11"
                }], "label": "安徽", "value": "2d95be44a12b4a9aaf9c877ad03683d3"
            }, {
                "children": [{
                    "children": [{
                        "label": "鼓楼区",
                        "value": "16724f5d0e8a4da1aa2dcafe43db8ca6"
                    }, {"label": "台江区", "value": "bba7044c5d5945718ba3d9d250f5098e"}, {
                        "label": "仓山区",
                        "value": "8175007b93ae46508a614ee36ef6dbb9"
                    }, {"label": "马尾区", "value": "0bd91aaed45740e7a286337fa3d8133f"}, {
                        "label": "晋安区",
                        "value": "f1649c2c48d24a0284d81e2fdc2e61a6"
                    }, {"label": "福清市", "value": "8d86c37e0c3f40f49638ce2558e2462e"}, {
                        "label": "长乐市",
                        "value": "f5fd87c70d8845ec8d198549fd8d6dd6"
                    }, {"label": "闽侯县", "value": "5d68f732e743451ea1b1af94c4ccf848"}, {
                        "label": "闽清县",
                        "value": "7f71862e395b43d4affc4a947471aa66"
                    }, {"label": "永泰县", "value": "d8a74aaef9174f68836e1a6fe945b81f"}, {
                        "label": "连江县",
                        "value": "a4a1a7ed082c47f2be9dc7298775167a"
                    }, {"label": "罗源县", "value": "49825c7fc61541318e2420001af6dc7b"}, {
                        "label": "平潭县",
                        "value": "88506cab5cec4635aa7725aef24c31ef"
                    }, {"label": "其他", "value": "d14d98977fe64483b27fe1c2747562c7"}],
                    "label": "福州",
                    "value": "824e97ddad79491db1950e7f0c1fd212"
                }, {
                    "children": [{"label": "思明区", "value": "44c685483cca4ea4ac6b7fe6a6d11837"}, {
                        "label": "海沧区",
                        "value": "8a3d053124464ff8b36d0e3e3126f949"
                    }, {"label": "湖里区", "value": "4b29ac90a7944fe2bcbcea39f6472e71"}, {
                        "label": "集美区",
                        "value": "89eb2060dd3c4227b8e7f92c02d1eb9d"
                    }, {"label": "同安区", "value": "ba4bcd8155c448e6bfe2b2abfed0dd25"}, {
                        "label": "翔安区",
                        "value": "dd123c2c6a7a467cb48ced9c953ffba8"
                    }, {"label": "其他", "value": "2efd6af6ce0047bf8c0421247b3c5e0b"}],
                    "label": "厦门",
                    "value": "387b3914fc4e45f1a88e3c3b3c152d5c"
                }, {
                    "children": [{"label": "城厢区", "value": "3ff1408c2a6046c2ada260f6b1a27bd8"}, {
                        "label": "涵江区",
                        "value": "e2197e22fd1541cbb71b0d8609980ca4"
                    }, {"label": "荔城区", "value": "f365ddcdce704707b3025f26b401e96f"}, {
                        "label": "秀屿区",
                        "value": "54a80844640b4b0a8e240004ac3347bd"
                    }, {"label": "仙游县", "value": "d19e89a843e84d838322be54814d041a"}, {
                        "label": "其他",
                        "value": "9f28b5b9a51940dea1095dcb1430ed88"
                    }], "label": "莆田", "value": "6e0420e223914d628ea8c34adee9bf93"
                }, {
                    "children": [{"label": "梅列区", "value": "524b9934d4f04e139a9a66e342747a6c"}, {
                        "label": "三元区",
                        "value": "ca6a82fbad0743b6a7a2ea5b05f74f6a"
                    }, {"label": "永安市", "value": "caab227ae83d45aabc6908787b250c44"}, {
                        "label": "明溪县",
                        "value": "ef531616bf234a4bb6a2d97872d4fd34"
                    }, {"label": "将乐县", "value": "b42e48ee1769487f9429b6a990e26df6"}, {
                        "label": "大田县",
                        "value": "7e771ce3805e4cc19aac73f594a14915"
                    }, {"label": "宁化县", "value": "a26ad1cae52640fb83a14c610cb6b8b2"}, {
                        "label": "建宁县",
                        "value": "c1bfa08126244e6699976e402d757837"
                    }, {"label": "沙县", "value": "5193c1cdc3b546a080607db315a4b8c8"}, {
                        "label": "尤溪县",
                        "value": "89c2b8ee211746e199f15b7eb203d7b1"
                    }, {"label": "清流县", "value": "44a4b5f9a86c49e9b702cf8976ce1b2d"}, {
                        "label": "泰宁县",
                        "value": "2d48388c91c247cea57652b9cf1e6348"
                    }, {"label": "其他", "value": "a61962b8534f42c7801e64173c66b07a"}],
                    "label": "三明",
                    "value": "44091643ba5e4093af583ec913b1b270"
                }, {
                    "children": [{"label": "鲤城区", "value": "9ed7989b4c0c462483e5a383225feb8c"}, {
                        "label": "丰泽区",
                        "value": "e6e9e35f56174a71ba3d971aec13e038"
                    }, {"label": "洛江区", "value": "c81b658e40eb4248930489a143e3af0b"}, {
                        "label": "泉港区",
                        "value": "2f049e851c5d45b8bcb4167fdb4affb2"
                    }, {"label": "石狮市", "value": "52df94ba772e4f219d09fb8a3978f524"}, {
                        "label": "晋江市",
                        "value": "e4a1e3969cb842879ccb010b3b6366e3"
                    }, {"label": "南安市", "value": "d1d009e87a594060bd143fa0ace6bf2f"}, {
                        "label": "惠安县",
                        "value": "cf477e15350242c6bdcd0eca07deea44"
                    }, {"label": "永春县", "value": "881e45e332904a71b01809c6e525a312"}, {
                        "label": "安溪县",
                        "value": "8a75b63744ee45a3b8dca5ec8b6692b8"
                    }, {"label": "德化县", "value": "09769103e4114667a12edbda71e1030f"}, {
                        "label": "金门县",
                        "value": "a7d66c9127bd4c8cb1d3f7d20e1417ba"
                    }, {"label": "其他", "value": "cedc75a7e5e640df96d7424f0b57b059"}],
                    "label": "泉州",
                    "value": "5fdc97a4197b48e8a3133b1c1056a1bf"
                }, {
                    "children": [{"label": "芗城区", "value": "7871124c5bd944b19b27ea4f9b89efd7"}, {
                        "label": "龙文区",
                        "value": "a42209968f10486897aca0e064ed3c8f"
                    }, {"label": "龙海市", "value": "26830a99d32041eab1f39c1b01bf8d7e"}, {
                        "label": "平和县",
                        "value": "553eca2002de482d9ed7b7a4a6a304fa"
                    }, {"label": "南靖县", "value": "1aee4824b4a245b6955fd6d280856e28"}, {
                        "label": "诏安县",
                        "value": "157fe5f914cf4dce8932bf724677d82e"
                    }, {"label": "漳浦县", "value": "423e2758597642aca3451256dcbee34a"}, {
                        "label": "华安县",
                        "value": "5be927eba6e64851a8d49efb74ed9a41"
                    }, {"label": "东山县", "value": "daef72702838478d9fdb86c87b99b047"}, {
                        "label": "长泰县",
                        "value": "88a2c1567b6d4b238b46f19668b47aa7"
                    }, {"label": "云霄县", "value": "a6e0405a249f4cccaceb24c60852d396"}, {
                        "label": "其他",
                        "value": "7227620288dc4d1cb2373ec4f661d2b0"
                    }], "label": "漳州", "value": "1f964257446c4082bfe106f0824e8fc2"
                }, {
                    "children": [{"label": "延平区", "value": "5bca16c6854848d78ea4d9d2803058a5"}, {
                        "label": "建瓯市",
                        "value": "77c5abc381ed4f359dd93b8b1d3304ef"
                    }, {"label": "邵武市", "value": "0c72b9fae9074802ba66942fadd58674"}, {
                        "label": "武夷山市",
                        "value": "22a08c858d6547a6abcb4c0407c175ef"
                    }, {"label": "建阳市", "value": "6e7d43c8f5a74735801383d9ade04877"}, {
                        "label": "松溪县",
                        "value": "bd55435614e743849dd6da6a5c58d3f7"
                    }, {"label": "光泽县", "value": "24036d57efe3419fbf1d60e396f43a52"}, {
                        "label": "顺昌县",
                        "value": "762f47380109410fb6040f0479be1a60"
                    }, {"label": "浦城县", "value": "42bda539c2194265902db17d29d25aec"}, {
                        "label": "政和县",
                        "value": "1421fb1d122a489592f91bc0e0a0e6da"
                    }, {"label": "其他", "value": "4b99a24062ef4a808f522d0dd60c5882"}],
                    "label": "南平",
                    "value": "159fcae0e10a4c41812e51a1c541c727"
                }, {
                    "children": [{"label": "新罗区", "value": "59cf1e86a57a4f28a4ce73eb8515a317"}, {
                        "label": "漳平市",
                        "value": "10725bf9748a4b32ad65a0904780fb5c"
                    }, {"label": "长汀县", "value": "69381afe585c41d5b222a5b221e0d242"}, {
                        "label": "武平县",
                        "value": "26f54607004445169bf0d28d6a9792aa"
                    }, {"label": "上杭县", "value": "a7c78c3b16f8474ebb826aa8f96fb754"}, {
                        "label": "永定县",
                        "value": "0f25587076124d0bb0cb2a7088f77cc4"
                    }, {"label": "连城县", "value": "5067360ff4a542348e68130a6f38c024"}, {
                        "label": "其他",
                        "value": "006d3584b4b141b48efd93efc3040a52"
                    }], "label": "龙岩", "value": "1fdb85aea5b041aea850079ad5907705"
                }, {
                    "children": [{"label": "蕉城区", "value": "ef766e1ed6f348b68e08c5cff95ddd02"}, {
                        "label": "福安市",
                        "value": "af5c3687a65744ebaecd555813608697"
                    }, {"label": "福鼎市", "value": "0b91bb66392b4bb9be42bffda4af43b4"}, {
                        "label": "寿宁县",
                        "value": "01243ea932ef426f904260b504a3f514"
                    }, {"label": "霞浦县", "value": "7e774d24914f46069f8d08fb53ef97de"}, {
                        "label": "柘荣县",
                        "value": "fa27934b9f984591a1b7e59b96bf9628"
                    }, {"label": "屏南县", "value": "29e4a967a65c439783190ba51f5a0053"}, {
                        "label": "古田县",
                        "value": "10af24d4430543f2974711715bfd020b"
                    }, {"label": "周宁县", "value": "7c859bf63f0a48ea9dbd2e6bd36bf912"}, {
                        "label": "其他",
                        "value": "59028d3d0e804648bf36ad2b2d3270e1"
                    }], "label": "宁德", "value": "c8050ceeaaaa499c950ec3829d0e5cd6"
                }, {
                    "children": [{"label": "其他", "value": "3d0f1252a48c4fed838678fc393ddb71"}],
                    "label": "其他",
                    "value": "60a4a0895d0c41bc8eb5241157944556"
                }], "label": "福建", "value": "3d010a83134a4cf692fa3c67e91ec52c"
            }, {
                "children": [{
                    "children": [{
                        "label": "东湖区",
                        "value": "d3abb4b9e18e45fd94c5eb7a131905ab"
                    }, {"label": "西湖区", "value": "195429d43a3f4f459c1ebc56dc966c17"}, {
                        "label": "青云谱区",
                        "value": "d2c3989cb7134274867c5b22f004562b"
                    }, {"label": "湾里区", "value": "73262b7827ec47039ee97753f9ddedd6"}, {
                        "label": "青山湖区",
                        "value": "555aad12c6484378a83ddfb04276668d"
                    }, {"label": "新建县", "value": "893aef79848d4191b78bd9f4aeb7d8e1"}, {
                        "label": "南昌县",
                        "value": "7eff1a2fbaab4e4a99af1c543ce1ca60"
                    }, {"label": "进贤县", "value": "1a0a6cecf205472c94356374c48c0842"}, {
                        "label": "安义县",
                        "value": "d10cef1195394d1c9df3c43396d1b92b"
                    }, {"label": "其他", "value": "28a553f748584aa8830fd9577a508634"}],
                    "label": "南昌",
                    "value": "08a53cee5ada4123af5db2902656e11b"
                }, {
                    "children": [{"label": "珠山区", "value": "48af14de26f04627a983dc0529067ba6"}, {
                        "label": "昌江区",
                        "value": "7cab8df4b8254624bf794be697715ccd"
                    }, {"label": "乐平市", "value": "311b87293cc34130b77817112b58f02f"}, {
                        "label": "浮梁县",
                        "value": "16fbbd7b96cb4399a2657facf2520a43"
                    }, {"label": "其他", "value": "429002371dac4801b8c05722393e459a"}],
                    "label": "景德镇",
                    "value": "cc719c2570bf4eb08fe3e22c6ef3df3b"
                }, {
                    "children": [{"label": "安源区", "value": "be9d8e0ee85f420aad948e49bc60711f"}, {
                        "label": "湘东区",
                        "value": "2bd7736b5d60456a8c3530443f51b7df"
                    }, {"label": "莲花县", "value": "c38ad22b66174251abfc6593d582081c"}, {
                        "label": "上栗县",
                        "value": "6c2490aa6a3c46a499b92f11f2f8ffb9"
                    }, {"label": "芦溪县", "value": "c8014174d10f439da07f5179ccdc6dff"}, {
                        "label": "其他",
                        "value": "cbfd2557f5864dbba9f596c28f9367e8"
                    }], "label": "萍乡", "value": "1f49aba5b0cb47f8a401a05af4b87bc9"
                }, {
                    "children": [{"label": "浔阳区", "value": "71cf62a732d14251b3127286e08215c3"}, {
                        "label": "庐山区",
                        "value": "4737a99c795449c2bae0202644129364"
                    }, {"label": "瑞昌市", "value": "b82e0555cb364f60bce1311cdf110282"}, {
                        "label": "九江县",
                        "value": "0aec1a56e2174e28aa8a0855fc7175c2"
                    }, {"label": "星子县", "value": "be8791e2851f4813b6028db62266be3b"}, {
                        "label": "武宁县",
                        "value": "2fd60bd264904d779aeaa95c95aed024"
                    }, {"label": "彭泽县", "value": "9cdacd8d64f74063b139893bab7428ba"}, {
                        "label": "永修县",
                        "value": "ed4e5773e5604d9db31e27ec8b957f81"
                    }, {"label": "修水县", "value": "4e76af9252b44100b6cd38fcd452e5a3"}, {
                        "label": "湖口县",
                        "value": "389fe649970e4cf0a04977062d2e012f"
                    }, {"label": "德安县", "value": "6841f9aac6364dbfb3cd23c284984488"}, {
                        "label": "都昌县",
                        "value": "221124872df242d1adb316365159c10b"
                    }, {"label": "其他", "value": "ef89819e3db24425906ee1812137ea64"}],
                    "label": "九江",
                    "value": "c847622c2ab649dd899edc92456e0a14"
                }, {
                    "children": [{"label": "渝水区", "value": "f7ea9fc01bbc4b8fa4ec60f2f3e9a946"}, {
                        "label": "分宜县",
                        "value": "58a8fda1c8e849b09fe040fbf1e1729b"
                    }, {"label": "其他", "value": "202f7a8156314a72800f04ebcfa2f049"}],
                    "label": "新余",
                    "value": "5e2ea1fbc64a4afbbcf94c7ad8f1fd0d"
                }, {
                    "children": [{"label": "月湖区", "value": "1fe24fe3ed144a6c927c7ce7afc6b5a1"}, {
                        "label": "贵溪市",
                        "value": "f9f7e2b881ed49c192fc4d0f584ad115"
                    }, {"label": "余江县", "value": "ddf8a9fa6708435faccb43112d3d385b"}, {
                        "label": "其他",
                        "value": "6dc03568bfe9416d8efc513df9fde4ed"
                    }], "label": "鹰潭", "value": "e2e17434f8c84a139261fa629a7a246b"
                }, {
                    "children": [{"label": "章贡区", "value": "2682fdff42d244da8fbf60eb1e7dc7e5"}, {
                        "label": "瑞金市",
                        "value": "e74a72238a864aebb955c9fe93471fb1"
                    }, {"label": "南康市", "value": "b06b2ae18e674714b5ccd3155ee7ede9"}, {
                        "label": "石城县",
                        "value": "6108d18d3ca3489eb6f96cfdf8555dae"
                    }, {"label": "安远县", "value": "6a67319ec977481d8b74e810288500a6"}, {
                        "label": "赣县",
                        "value": "7123567d30b54f799cb73f5a2ba43a98"
                    }, {"label": "宁都县", "value": "b40a15755c5f4c88ba58d5930d5c5cae"}, {
                        "label": "寻乌县",
                        "value": "1c050298ea6445b793f3994cc61ebb3d"
                    }, {"label": "兴国县", "value": "c97d2c892c144a249a879958e6887938"}, {
                        "label": "定南县",
                        "value": "f408148f9b8b48c2a923a28de77cd755"
                    }, {"label": "上犹县", "value": "e6ea6b0d003748599fd3f63b47b29fc3"}, {
                        "label": "于都县",
                        "value": "4501df13adc249e08610ef2bff8bb1b0"
                    }, {"label": "龙南县", "value": "5cf677da56f84305ac172c14e5284eda"}, {
                        "label": "崇义县",
                        "value": "6c71d209a96e489ba2cbe0cd3e3705b3"
                    }, {"label": "信丰县", "value": "4ec64f1ee82e465181f475f46523cea7"}, {
                        "label": "全南县",
                        "value": "b4b9393ed15542e384a4a50590159b6b"
                    }, {"label": "大余县", "value": "ff4a5df05db8496f95b345af35d2bb2f"}, {
                        "label": "会昌县",
                        "value": "d6b77102421e4d95bdb2f682a290c1eb"
                    }, {"label": "其他", "value": "b87b9e43cbe245f8bff5fdd952a200ab"}],
                    "label": "赣州",
                    "value": "1afee8a6ddaa43c2a30ef79eda43da6f"
                }, {
                    "children": [{"label": "吉州区", "value": "f68376bdb60244ddb4122edd3224e2e0"}, {
                        "label": "青原区",
                        "value": "f0aae1a10a8a41e08e8d8c269b25a8bb"
                    }, {"label": "井冈山市", "value": "a32794e698e34d35a91269d2402032a6"}, {
                        "label": "吉安县",
                        "value": "ed4c9f3ab3974130b8d4367e8a58a021"
                    }, {"label": "永丰县", "value": "9268055a1ea74cc48732e05a30e26515"}, {
                        "label": "永新县",
                        "value": "7794a02fdae74899954d024f86accea1"
                    }, {"label": "新干县", "value": "6fca043eed2b451b9bbf8fd96ea7b160"}, {
                        "label": "泰和县",
                        "value": "f5f34d287bfb4563b065ef9d50213e3d"
                    }, {"label": "峡江县", "value": "76faf4ada78545808f3ebebc986790ae"}, {
                        "label": "遂川县",
                        "value": "e517fc8e549f4dd9a92edef314eabcf9"
                    }, {"label": "安福县", "value": "43849e321f7f40a281c69b95976a285c"}, {
                        "label": "吉水县",
                        "value": "e81d99f409574b16b6143d0f2ad07427"
                    }, {"label": "万安县", "value": "5652096cb64940a09a74ee801de9467b"}, {
                        "label": "其他",
                        "value": "5a15ab5c47e44f37816d20d7a8037251"
                    }], "label": "吉安", "value": "3fec147f412c4eebae61cded819b3801"
                }, {
                    "children": [{"label": "袁州区", "value": "e015a8f6c9a640f7a8142276c784bb34"}, {
                        "label": "丰城市",
                        "value": "25d0f9d72476406eb098020f672c78bd"
                    }, {"label": "樟树市", "value": "f5387cb0a2514c5d84886051e3191bf1"}, {
                        "label": "高安市",
                        "value": "619f018844834d5899c57a1aa13d886e"
                    }, {"label": "铜鼓县", "value": "f2eb5e6592a54f66b24173c3c60b669a"}, {
                        "label": "靖安县",
                        "value": "c654931486f540d6aa107c39870937c8"
                    }, {"label": "宜丰县", "value": "1ffafe5f8758432a989d740ae9440553"}, {
                        "label": "奉新县",
                        "value": "66ba4dfe07c943deaac31760f6984f4a"
                    }, {"label": "万载县", "value": "d3af952f1f1142dba2bd8f5264066247"}, {
                        "label": "上高县",
                        "value": "43a7f8fccf0b482e9890af2b56e5cc61"
                    }, {"label": "其他", "value": "f46222b8deaa47e9838b192016a473dc"}],
                    "label": "宜春",
                    "value": "b0b46a0b06e1460a9d60327ae336d15f"
                }, {
                    "children": [{"label": "临川区", "value": "79a576308c6e4f47b2c01a7b120bb511"}, {
                        "label": "南丰县",
                        "value": "62b9737c16904b76ad50b042acabfabe"
                    }, {"label": "乐安县", "value": "229e97503cec4a038236b19548e727f1"}, {
                        "label": "金溪县",
                        "value": "bf74b2dceb4942a49aed8dc0da654019"
                    }, {"label": "南城县", "value": "cf5633028a474b9cb9a2e123480f253a"}, {
                        "label": "东乡县",
                        "value": "6907f8932e4c431589324f4305cc3e0f"
                    }, {"label": "资溪县", "value": "65d91f754ba0464d97922ddadaccafee"}, {
                        "label": "宜黄县",
                        "value": "01a82d97e25748faae23a236d65ce1d0"
                    }, {"label": "广昌县", "value": "9b4fe159ddc04124854fdeee1b8e2aba"}, {
                        "label": "黎川县",
                        "value": "1130fd7c31be469aafb97fbf1d7458ae"
                    }, {"label": "崇仁县", "value": "b78fdc2f6d9a4c4f860717792278aa31"}, {
                        "label": "其他",
                        "value": "18251f7e803543369633cf4cd9c83432"
                    }], "label": "抚州", "value": "fa9bed7f2ead4efd9a32237dda77f3b6"
                }, {
                    "children": [{"label": "信州区", "value": "5fddf665e5fa498fb86997a71d4fa605"}, {
                        "label": "德兴市",
                        "value": "f289caeec6de4fe7944ea85404b7e638"
                    }, {"label": "上饶县", "value": "985eaf1221424c1391c57091957e56d2"}, {
                        "label": "广丰县",
                        "value": "fb9fab7bfb9d461289f91dcd33b93d34"
                    }, {"label": "鄱阳县", "value": "64777aa6e3e84c88b32fb8617e4250df"}, {
                        "label": "婺源县",
                        "value": "00d86c6de91a4ae4b928c6472ea94cf0"
                    }, {"label": "铅山县", "value": "77852873cb6d41e59851388f502b953f"}, {
                        "label": "余干县",
                        "value": "086dcdc338fa4601980ffa63b300925b"
                    }, {"label": "横峰县", "value": "dcce6bd06bf54aa8a9917093e8488edd"}, {
                        "label": "弋阳县",
                        "value": "a6be784496e5419d99629a3ef25a16c8"
                    }, {"label": "玉山县", "value": "97376849769e41938e730e43b3f72e04"}, {
                        "label": "万年县",
                        "value": "39193af03d1d43af9a49b5cdd122f568"
                    }, {"label": "其他", "value": "9bd49e8a4f7745aeac8d4bc303157b46"}],
                    "label": "上饶",
                    "value": "a417f5d08c2c4e4586e03f0952d8a5c2"
                }, {
                    "children": [{"label": "其他", "value": "1666fc5ea4a44dfa80ed14428d8598ca"}],
                    "label": "其他",
                    "value": "c96be2824b5845b58207d68010e9d252"
                }], "label": "江西", "value": "95253a8e80e94ee38d75ed20f4b0ecff"
            }, {
                "children": [{
                    "children": [{
                        "label": "市中区",
                        "value": "3e6a3d2b7baa452786c2955d72f41263"
                    }, {"label": "历下区", "value": "e4cbe4f5a5184735904e8cf5f5fca712"}, {
                        "label": "天桥区",
                        "value": "f0effb874bfc49c69c12a127ac1ad314"
                    }, {"label": "槐荫区", "value": "ee582291817f494c9c3ffea850d27d64"}, {
                        "label": "历城区",
                        "value": "5014cc40dee04307b20021f8b6e5dc82"
                    }, {"label": "长清区", "value": "de6625ba4532459a9fd3a42584f483b0"}, {
                        "label": "章丘市",
                        "value": "362c84af8435477188fceda2e2c889a0"
                    }, {"label": "平阴县", "value": "b2cdd7116866404881260ca3a983f06f"}, {
                        "label": "济阳县",
                        "value": "1c87541a24f84263b281e146563df544"
                    }, {"label": "商河县", "value": "4e161c1d0c1646d897a60aa0c6ea1f19"}, {
                        "label": "其他",
                        "value": "61476642f93b4e34b56a902623e8e0fe"
                    }], "label": "济南", "value": "5f251274a8484541b5b0f96f79c9470d"
                }, {
                    "children": [{"label": "市南区", "value": "70df39f90d9244fba038a06f6e8c2520"}, {
                        "label": "市北区",
                        "value": "5f2d98f21db14b9589f7a114bc91ffad"
                    }, {"label": "城阳区", "value": "99cb5d3e099d4aa9a6df190df66d3c72"}, {
                        "label": "四方区",
                        "value": "7378fa8145a64fda87c72d5283de39e8"
                    }, {"label": "李沧区", "value": "919c76a5b2a949499b70f2d19363433e"}, {
                        "label": "黄岛区",
                        "value": "1d7cdf8d019d424cbce12ecd2fb20bc7"
                    }, {"label": "崂山区", "value": "d9a9df4025d64805880d1f1b7f0b2f2d"}, {
                        "label": "胶南市",
                        "value": "ddd12fb2885d4f9197632e86977ee494"
                    }, {"label": "胶州市", "value": "9b23513f24c64d7686537c81976b124f"}, {
                        "label": "平度市",
                        "value": "f6e01d6eacf0472b8dc0dd1b32b726ac"
                    }, {"label": "莱西市", "value": "5360729c0fbd4e9abfce6682a2b28926"}, {
                        "label": "即墨市",
                        "value": "73b8299d3aa6433184f9966e9df884e2"
                    }, {"label": "其他", "value": "62ef029b3c9646c18ba3dff6858627d6"}],
                    "label": "青岛",
                    "value": "60b74fa26ed44f008bdde3015060d538"
                }, {
                    "children": [{"label": "张店区", "value": "7ae6ac7890f24dc08bcbbe02013f8a7f"}, {
                        "label": "临淄区",
                        "value": "3eca69b66e024970927c3b76f3e52686"
                    }, {"label": "淄川区", "value": "7fba1bb9fa8b4af3b9b89140d8b5d1b3"}, {
                        "label": "博山区",
                        "value": "f882b9288fb44d80835e9ebcb058810e"
                    }, {"label": "周村区", "value": "03bdc6efb24746a5a96782a5dcd63fed"}, {
                        "label": "桓台县",
                        "value": "cf2b7a8c5b324740880e976f8c169563"
                    }, {"label": "高青县", "value": "7c92a1afc55d40fbad365dfa921323ba"}, {
                        "label": "沂源县",
                        "value": "ea89088528a64a8fbaed1fa4f85ecfaa"
                    }, {"label": "其他", "value": "717ab8a5c3d541749100ce4652b036de"}],
                    "label": "淄博",
                    "value": "4550975386b3484da01155456fc6b3cf"
                }, {
                    "children": [{"label": "市中区", "value": "6892090741944a299bac120abe63114d"}, {
                        "label": "山亭区",
                        "value": "02767f6395ab4ac6bf03f78ae8d2d653"
                    }, {"label": "峄城区", "value": "8ef85f6c4dc64b23888e9edb2ee299dc"}, {
                        "label": "台儿庄区",
                        "value": "13853ae33c694906ab32bcd8b61bf305"
                    }, {"label": "薛城区", "value": "f7ff810b032e4e8faa4ecae0f7a7ce8c"}, {
                        "label": "滕州市",
                        "value": "2d1c7881d3c240acb41c9cbc451a45f1"
                    }, {"label": "其他", "value": "d61cf87555b54aba94b089dced65c24f"}],
                    "label": "枣庄",
                    "value": "84979d104ef0441292d70583ac1f8308"
                }, {
                    "children": [{"label": "东营区", "value": "7c64d554a125497fa415f0c0acc60701"}, {
                        "label": "河口区",
                        "value": "3e64096cd90544c592926defe737af9b"
                    }, {"label": "垦利县", "value": "f7ff63620b06452bb890e1479c3c2c18"}, {
                        "label": "广饶县",
                        "value": "b0d48559d00b4eeaa21ffe3be5d695bd"
                    }, {"label": "利津县", "value": "2a93251e30c646508f6dfbb358447921"}, {
                        "label": "其他",
                        "value": "2b470d0e33be4c78a50fdb14e8b40f03"
                    }], "label": "东营", "value": "36bdac9fd26c49eea561976f5b155f76"
                }, {
                    "children": [{"label": "芝罘区", "value": "a553a1620b644cb9bc31256bde9a8a39"}, {
                        "label": "福山区",
                        "value": "01c84f5d074f4c34b4e78233064bccdd"
                    }, {"label": "牟平区", "value": "65d7eb72c5d941c5860ba3427389c340"}, {
                        "label": "莱山区",
                        "value": "6ac2205349e843988ca742ff84755c5c"
                    }, {"label": "龙口市", "value": "e5af8ff2b82f4ef996cd30b7e6c49614"}, {
                        "label": "莱阳市",
                        "value": "8e8ef43b663b45249ac18ef527ec4eb0"
                    }, {"label": "莱州市", "value": "9b8d12616830486ca7f38edc892924b1"}, {
                        "label": "招远市",
                        "value": "0c968fa171e844ffb09e4648febebcf0"
                    }, {"label": "蓬莱市", "value": "45913534510e4a4f8171e6e300b2154f"}, {
                        "label": "栖霞市",
                        "value": "ddd14e94de9b419da26105e79e8c16f4"
                    }, {"label": "海阳市", "value": "98c76b2a7bf94eabb7387774d551527f"}, {
                        "label": "长岛县",
                        "value": "613187c059214d6489ea17c320ad4718"
                    }, {"label": "其他", "value": "1b0a9410b9414c01bf1db494e42c01d8"}],
                    "label": "烟台",
                    "value": "e58a4fa6f84b421b84893dea1e4f8a82"
                }, {
                    "children": [{"label": "潍城区", "value": "ee118458283d4515891ea6e358f17cc1"}, {
                        "label": "寒亭区",
                        "value": "39e1d501292843a0a49dbc4176c532b5"
                    }, {"label": "坊子区", "value": "53eddc93c1b54b4bac6f967ff24424f7"}, {
                        "label": "奎文区",
                        "value": "ad17c5da051849eb876978276eb367f3"
                    }, {"label": "青州市", "value": "77de954261ba437faeaf6a9636faeed9"}, {
                        "label": "诸城市",
                        "value": "e60d53a537f1488885724ca6cc0bd1be"
                    }, {"label": "寿光市", "value": "9f358e272a1142fa911600c6e301046f"}, {
                        "label": "安丘市",
                        "value": "0766ecd3e8fe4569933f6d7981a67a24"
                    }, {"label": "高密市", "value": "243908f673c243c1b84411680edc9975"}, {
                        "label": "昌邑市",
                        "value": "d64a2753dc744da19f8e15fa30a07cc1"
                    }, {"label": "昌乐县", "value": "a08f5fb42cf54a70af95735bdea02662"}, {
                        "label": "临朐县",
                        "value": "9b5613a0701249838a90082432efaf02"
                    }, {"label": "其他", "value": "103ffcb131ad43ae97c89788dc71db44"}],
                    "label": "潍坊",
                    "value": "5e4546cd7ea64fd490b7cd94ea235521"
                }, {
                    "children": [{"label": "市中区", "value": "72c5e1c285c741c0828096055f8c7de8"}, {
                        "label": "任城区",
                        "value": "44f79d70036e40799ced506a831e04cb"
                    }, {"label": "曲阜市", "value": "99775ca5145f476ba36a4783518ceb1c"}, {
                        "label": "兖州市",
                        "value": "809755b99546424c8190675f470dd902"
                    }, {"label": "邹城市", "value": "07d6efd6f90d41249296801683bb7a04"}, {
                        "label": "鱼台县",
                        "value": "55832a0bf2a941389f0ec55187d5fef8"
                    }, {"label": "金乡县", "value": "644ed40d25e44933a94cf937053ec70d"}, {
                        "label": "嘉祥县",
                        "value": "6e1a1ffaf92c476cb959d6027600b5e0"
                    }, {"label": "微山县", "value": "f9d229b0f39a49c5941f1c01879aa562"}, {
                        "label": "汶上县",
                        "value": "3b4cb7592189402c8655140c465180a1"
                    }, {"label": "泗水县", "value": "f326224851124ff087ee2c9c3328cdaa"}, {
                        "label": "梁山县",
                        "value": "46d238a49e1f492e967fe26ffaec729a"
                    }, {"label": "其他", "value": "62538f9c7cc04e4c9edd5d20cc241aa3"}],
                    "label": "济宁",
                    "value": "eae034897b8648539a3af5ff92b051cd"
                }, {
                    "children": [{"label": "泰山区", "value": "1df550bd8c84401b85ae4cc870aab1ed"}, {
                        "label": "岱岳区",
                        "value": "02799c27ad4d41cf98385d5a7c4a19c1"
                    }, {"label": "新泰市", "value": "7bff04a5e8dc4b59bfee60a911ed72f5"}, {
                        "label": "肥城市",
                        "value": "f0343e05f5b941628977bb7b8190ea44"
                    }, {"label": "宁阳县", "value": "1d7d51dbb9e54232b0209601f49cdd0a"}, {
                        "label": "东平县",
                        "value": "326bfba272174d66a95d38aba750eeb0"
                    }, {"label": "其他", "value": "b9c4bf0ade134fa694f17abc40a98583"}],
                    "label": "泰安",
                    "value": "60ab94d34c6c40afa3ec63511f8418bf"
                }, {
                    "children": [{"label": "环翠区", "value": "b53b17100b004b7c836b9a37541a4721"}, {
                        "label": "乳山市",
                        "value": "a7fc0d0a701d429b9f2b31687f1cd848"
                    }, {"label": "文登市", "value": "b0798e7875184060b4b46b414dc8ae26"}, {
                        "label": "荣成市",
                        "value": "105941def5a84af19838ed77a99fdf5a"
                    }, {"label": "其他", "value": "e60285a734df433f81295d0b167d525e"}],
                    "label": "威海",
                    "value": "188dd3c4f91a4c9c9aab0d24a942beae"
                }, {
                    "children": [{"label": "东港区", "value": "a02fe31845c749ab964bf62399bd1677"}, {
                        "label": "岚山区",
                        "value": "74c07387df02458a8e2ce37ac81418b3"
                    }, {"label": "五莲县", "value": "258b9d213cd64a1d9c15fa25e07311a9"}, {
                        "label": "莒县",
                        "value": "5b84c214fbfc460aba9e4f76e0c3bf31"
                    }, {"label": "其他", "value": "b61388ef9f6f4436886372ee7b59421a"}],
                    "label": "日照",
                    "value": "61627a05b33b4e598dba15f67f0b945e"
                }, {
                    "children": [{"label": "莱城区", "value": "4865d3fe19484954946d1eb26849359e"}, {
                        "label": "钢城区",
                        "value": "8072acc8de3d48ae9186ba4166d856bd"
                    }, {"label": "其他", "value": "70de31ebb7fe4f2a9a2647a93c62b866"}],
                    "label": "莱芜",
                    "value": "a6388e21ccd54cd484fc98bb7599fd98"
                }, {
                    "children": [{"label": "兰山区", "value": "e0f82e068a76499a8a43d4d508650342"}, {
                        "label": "罗庄区",
                        "value": "fa9bb2583bc54f65b8148862a659ac3d"
                    }, {"label": "河东区", "value": "5ea4c3f0814b41b69398fb8c9b5c4d6f"}, {
                        "label": "沂南县",
                        "value": "47f7051917244e208a52d33b779f83a5"
                    }, {"label": "郯城县", "value": "5b696cf907c74fa3b388dcf078441f93"}, {
                        "label": "沂水县",
                        "value": "688bac18ae664f08aae0fad5b5bd3a46"
                    }, {"label": "苍山县", "value": "2031a9d86f1244a58465a2e789d7ea7a"}, {
                        "label": "费县",
                        "value": "ce28513e61c3416ab59ae3ed09e0e23f"
                    }, {"label": "平邑县", "value": "b4bab5b6152b49cf938907aeb26965f8"}, {
                        "label": "莒南县",
                        "value": "18f207a6259047dc92763f189e4b3f41"
                    }, {"label": "蒙阴县", "value": "13ff34f1ed1a47a2851918d7ec5f0065"}, {
                        "label": "临沭县",
                        "value": "51eb500e0b0d42838a59276a4bd12b50"
                    }, {"label": "其他", "value": "4038d6b8aab945e18153b74500109510"}],
                    "label": "临沂",
                    "value": "092cf83647c1427ba72e71f7b258893d"
                }, {
                    "children": [{"label": "德城区", "value": "948119ee3cd74b928e89c6b4dc10994c"}, {
                        "label": "乐陵市",
                        "value": "e5dfb4ad5ee74fc38c76b9d85bba71a5"
                    }, {"label": "禹城市", "value": "0c3e55b8a95b492ca709ee1a602806dc"}, {
                        "label": "陵县",
                        "value": "9fedca20bb594c1d875511352c156920"
                    }, {"label": "宁津县", "value": "3832d75cfcb140b0b9b688b4a4529016"}, {
                        "label": "齐河县",
                        "value": "2ef0479242694cdd8724c43775d7c72a"
                    }, {"label": "武城县", "value": "4025d598e95741a19c074ef3ee660e9b"}, {
                        "label": "庆云县",
                        "value": "74767611bf694d909a8c3e3a899e5d81"
                    }, {"label": "平原县", "value": "0a741508c1d547d6a878d6c2e5d3656b"}, {
                        "label": "夏津县",
                        "value": "a12c7de1206e48b2900b3ba584db6b68"
                    }, {"label": "临邑县", "value": "f3e8a8d4f9e44ecb82e847a5c442c678"}, {
                        "label": "其他",
                        "value": "387dfee9e2d44df8844a7718411e03e0"
                    }], "label": "德州", "value": "a035f8071b4a4ab4a899e3b76c9239cf"
                }, {
                    "children": [{"label": "东昌府区", "value": "51761b037f164fb4b90e79223940780b"}, {
                        "label": "临清市",
                        "value": "d25b39847f98494f9eb3e60967ec40dd"
                    }, {"label": "高唐县", "value": "a742a15ca3434f149ce1c059fe0d31f2"}, {
                        "label": "阳谷县",
                        "value": "627539c3ca444d8ebb6c437ebdccc592"
                    }, {"label": "茌平县", "value": "6ae3f45d195643f48bc976fa59a2c728"}, {
                        "label": "莘县",
                        "value": "ffac81d8d4054dcaa53dc6efeed39544"
                    }, {"label": "东阿县", "value": "a006136d7c8943d09ff855372a15720b"}, {
                        "label": "冠县",
                        "value": "59e4893519c043c2896a8450a719d744"
                    }, {"label": "其他", "value": "bcd4640806f54686b579a30ca9c4934c"}],
                    "label": "聊城",
                    "value": "696a92a03228453ca6eec4cad0d8ba11"
                }, {
                    "children": [{"label": "滨城区", "value": "2c76297dd1e24cb99356755727facd52"}, {
                        "label": "邹平县",
                        "value": "c49eb917d96b404595b1b699c9ee88fa"
                    }, {"label": "沾化县", "value": "2ee8a01eaf314c0bb392a52961438b35"}, {
                        "label": "惠民县",
                        "value": "224db6b0db564d7d9ea85d0c8ade3548"
                    }, {"label": "博兴县", "value": "513f0b1b1ddb40a487bb10fce4fb216c"}, {
                        "label": "阳信县",
                        "value": "8e5e5f7d307441f7bc617d7317d846b5"
                    }, {"label": "无棣县", "value": "fd722ed0a3f84e338133aa1354794f54"}, {
                        "label": "其他",
                        "value": "45c170256cc34d639cf1cf9364ee19c3"
                    }], "label": "滨州", "value": "e429218aad7242b7998db56effee9e46"
                }, {
                    "children": [{"label": "牡丹区", "value": "950d700573094ff68bd1acffd38af658"}, {
                        "label": "鄄城县",
                        "value": "e42489d114b14ebd90f3c0a03141599e"
                    }, {"label": "单县", "value": "bd7f76567b194150a272e0db3b528106"}, {
                        "label": "郓城县",
                        "value": "e34cd69aac1540c1be0bd770a8582d75"
                    }, {"label": "曹县", "value": "292716e3732a4e86ae01380d9e4a8423"}, {
                        "label": "定陶县",
                        "value": "77c0017e74a049fab7593339120431e6"
                    }, {"label": "巨野县", "value": "6683102618bf4649a4ec246927e53330"}, {
                        "label": "东明县",
                        "value": "618b26d812854097ab346f6ce618097b"
                    }, {"label": "成武县", "value": "29b653a6b3df46a384eba06fd45e7224"}, {
                        "label": "其他",
                        "value": "127808aeb50f4aac959b07a23cda0b38"
                    }], "label": "菏泽", "value": "178516b9626e41b2aa1ba4eb771b8ca4"
                }, {
                    "children": [{"label": "其他", "value": "be107f8df8294b8788f228df565c7702"}],
                    "label": "其他",
                    "value": "3cc8bf38a9c44cce9425779841ef13fd"
                }], "label": "山东", "value": "e7637ec979904b3db785ea3a9f5bd010"
            }, {
                "children": [{
                    "children": [{
                        "label": "中原区",
                        "value": "70344dcab48d4f2295679b1abea5e4bc"
                    }, {"label": "金水区", "value": "6ccf275038d94b94abd0a5d501a1165e"}, {
                        "label": "二七区",
                        "value": "2c280d53b700423d9b1da9ecbae9bc26"
                    }, {"label": "管城回族区", "value": "509668c4a1ff48d59cf1451825489d85"}, {
                        "label": "上街区",
                        "value": "591270f80c2f4e6da39c5569b6725d15"
                    }, {"label": "惠济区", "value": "7dc0a4ee48674deab8b1e1a390825ca0"}, {
                        "label": "巩义市",
                        "value": "a90d002ac68d4d3b8827cd72242b0463"
                    }, {"label": "新郑市", "value": "03160096129845d4bff8fce0b969c46b"}, {
                        "label": "新密市",
                        "value": "a451bbb4527f4c0da10bbc990079f466"
                    }, {"label": "登封市", "value": "e295de5530924e6581e920631ba6991d"}, {
                        "label": "荥阳市",
                        "value": "0612a450fa2e4137b160082475976c37"
                    }, {"label": "中牟县", "value": "72d583e9a3504248953b9dd39c981a2c"}, {
                        "label": "其他",
                        "value": "950532110efb45ad88dfbaa7af872b25"
                    }], "label": "郑州", "value": "ebec54a5ce4a4324a7ceb72ea3a5c338"
                }, {
                    "children": [{"label": "鼓楼区", "value": "3e57fe7eaeea4283ad76692576b5860d"}, {
                        "label": "龙亭区",
                        "value": "8b7be66bc6de45cb809e57638cb6aad1"
                    }, {"label": "顺河回族区", "value": "70a75bffbdeb42e288ee429962e765dc"}, {
                        "label": "禹王台区",
                        "value": "71cbde334ae14a159d855052c3c1e3b2"
                    }, {"label": "金明区", "value": "0f7d6679e8e64a1199990020a37e8b99"}, {
                        "label": "开封县",
                        "value": "bacb4b625a19415a86059126b63c8e44"
                    }, {"label": "尉氏县", "value": "4716b371497044a18daa603a27c80935"}, {
                        "label": "兰考县",
                        "value": "7fa9b8569a204101b11e5e45fde6650b"
                    }, {"label": "杞县", "value": "3d0c860e7ebe400fb3906eefb6dbcbe6"}, {
                        "label": "通许县",
                        "value": "99a5507c712d4946a03c8e47b23d541d"
                    }, {"label": "其他", "value": "76754d326a4246faa2258cc3924375d6"}],
                    "label": "开封",
                    "value": "9266e77c841b4152aa80343068a2ee2a"
                }, {
                    "children": [{"label": "西工区", "value": "e17a6cdeac934f9498612916dd6e357f"}, {
                        "label": "老城区",
                        "value": "92dfb18165d648d6ae560057bb501801"
                    }, {"label": "涧西区", "value": "5a183d690e004d6aa73a830c8c5162ee"}, {
                        "label": "瀍河回族区",
                        "value": "77dbcf8455804311a41f30e2f73f6d98"
                    }, {"label": "洛龙区", "value": "68719ae327b64475bb06973f2ce052f1"}, {
                        "label": "吉利区",
                        "value": "7b2e551103664b5c8a684a9ecf13aa28"
                    }, {"label": "偃师市", "value": "827bda0bdbb5455b9c08ace0c30fc151"}, {
                        "label": "孟津县",
                        "value": "b230d7bfd98c43c7a5e608c9d55ab32c"
                    }, {"label": "汝阳县", "value": "040e25cd9be8495facd47373d676d340"}, {
                        "label": "伊川县",
                        "value": "71e001ee727443a48bbc702922714487"
                    }, {"label": "洛宁县", "value": "6e10471e904243e6b8fc1ad4d01fcc68"}, {
                        "label": "嵩县",
                        "value": "fd880d32515e4e1c9db7d890e9f51efe"
                    }, {"label": "宜阳县", "value": "1721d865a4d148359989708001c65562"}, {
                        "label": "新安县",
                        "value": "c0d4e66af59c4bfc95f9b9416128bc3c"
                    }, {"label": "栾川县", "value": "f17a2e6c46d94becaad603746654e0b7"}, {
                        "label": "其他",
                        "value": "f7febfff876e4567940baed2c009cedd"
                    }], "label": "洛阳", "value": "05f1f8581f334fc694577c486ad52380"
                }, {
                    "children": [{"label": "新华区", "value": "a6fc1a3e3cef4757b437d5cc3ace4b7e"}, {
                        "label": "卫东区",
                        "value": "b84ac48380ba41f3b50a0fac4c63fbcc"
                    }, {"label": "湛河区", "value": "1aefe3895ccf4943b4a8970c7a691b83"}, {
                        "label": "石龙区",
                        "value": "edb051aafc6f44a68f8361f503cb4996"
                    }, {"label": "汝州市", "value": "2e04389768164cecb010849bb7e98d16"}, {
                        "label": "舞钢市",
                        "value": "085f368446f14c28bc6fac455fb3b18e"
                    }, {"label": "宝丰县", "value": "b3660db4bab649e2a21ad5dae5bc8fad"}, {
                        "label": "叶县",
                        "value": "01cb4a80400c44ff882aa9a8b5acbc4b"
                    }, {"label": "郏县", "value": "ff48f6740fb7414dbf9d4cc4e874fc0a"}, {
                        "label": "鲁山县",
                        "value": "6a5fb59c2ad04315832376b94c34042d"
                    }, {"label": "其他", "value": "a41b2f60e5114e3ab4aa3fc9bdf52c29"}],
                    "label": "平顶山",
                    "value": "f18abef57fdb48f891238f4983a24f2f"
                }, {
                    "children": [{"label": "北关区", "value": "6330a23fa6f340dab4f097ff868beb12"}, {
                        "label": "文峰区",
                        "value": "a56020d4d3d545bdbe439d58a00020a7"
                    }, {"label": "殷都区", "value": "034d8160346c42ba96742b8d6f5d8ba4"}, {
                        "label": "龙安区",
                        "value": "7d26f0cf0f5d4c7dbfcdf021125983b3"
                    }, {"label": "林州市", "value": "12e4b33946bf4e7a9c7b0451e5cfec26"}, {
                        "label": "安阳县",
                        "value": "206753624d40415b9f7e30dedaad58cc"
                    }, {"label": "滑县", "value": "991a380d50a045cebfd5d64dddf72f71"}, {
                        "label": "内黄县",
                        "value": "0b6cb5a015b94ba6aeb7b3f8a8c1d05d"
                    }, {"label": "汤阴县", "value": "48b31df7a1bc4e4e8aa7db7a64107eed"}, {
                        "label": "其他",
                        "value": "8526dcde968b43a89a35c815043947fb"
                    }], "label": "安阳", "value": "b344f13dd23e4d87bb23365354057e0c"
                }, {
                    "children": [{"label": "淇滨区", "value": "929605cdee6e42669a7adeb0d4d36fb1"}, {
                        "label": "山城区",
                        "value": "1252af1f6d864ae9bde985611ee606e0"
                    }, {"label": "鹤山区", "value": "cf11636c03fa4a3d9f73b5ddd1d61cc3"}, {
                        "label": "浚县",
                        "value": "12f0560843af4e0e876723454f58236b"
                    }, {"label": "淇县", "value": "d2c9e6a63c9d4c43949d59e750cc204f"}, {
                        "label": "其他",
                        "value": "2e4a794871ce468188ec17a8316dfcc6"
                    }], "label": "鹤壁", "value": "682a803906bf43a19c5e5fd2ef4dd5b3"
                }, {
                    "children": [{"label": "卫滨区", "value": "c80beff85ecd4217bb32945ef02109ec"}, {
                        "label": "红旗区",
                        "value": "ceef5288c17a4045892604946ea2c5c6"
                    }, {"label": "凤泉区", "value": "b03eeae9b7a74c44bb8489939a1f95ad"}, {
                        "label": "牧野区",
                        "value": "3beaf28baa6846e394888c28d1d745f5"
                    }, {"label": "卫辉市", "value": "4655ac9445154bafb5b23b0640438386"}, {
                        "label": "辉县市",
                        "value": "0af0c1d265f44a7a88218b1853b4eb8e"
                    }, {"label": "新乡县", "value": "c8276f684396400bb6bf659265121fd0"}, {
                        "label": "获嘉县",
                        "value": "6afbcb86ff354d5394798d16c420bdc4"
                    }, {"label": "原阳县", "value": "a3992f570a82466eb9246a60e5067114"}, {
                        "label": "长垣县",
                        "value": "910a5c24516c41c99566cce8dd22bfbd"
                    }, {"label": "封丘县", "value": "1ae01abca51f4621ac4831952fbb3ffb"}, {
                        "label": "延津县",
                        "value": "e3ff8af7082240b1a949c9e33dcc81f3"
                    }, {"label": "其他", "value": "2161e0b6f97d46179bf18d15cc86b757"}],
                    "label": "新乡",
                    "value": "35c610af34604147bd84ee0c2e687461"
                }, {
                    "children": [{"label": "解放区", "value": "1732c571c83d4dccaee5354a514f7592"}, {
                        "label": "中站区",
                        "value": "a77c41ced5ea4ca2860473fbf042eeb5"
                    }, {"label": "马村区", "value": "ebd748cf409e4f6c8dcb635902bd78ba"}, {
                        "label": "山阳区",
                        "value": "98c9f24ec9a6431191d3aa92ddcc41d4"
                    }, {"label": "沁阳市", "value": "5125113b46ca47eaa4364e10b2a6fd02"}, {
                        "label": "孟州市",
                        "value": "4b70a4d593d445ba8f6d2d2c25321412"
                    }, {"label": "修武县", "value": "610ee7acd64b4463a7d6062c5c0a6fa4"}, {
                        "label": "温县",
                        "value": "4401f4cdcab3491682fad81906338693"
                    }, {"label": "武陟县", "value": "74edabf1b0084faf9508e3ca0816e409"}, {
                        "label": "博爱县",
                        "value": "c93c1feb007a416d9ddcc3acdeded120"
                    }, {"label": "其他", "value": "7ec8affb1bf9476eb81ce681a2e53161"}],
                    "label": "焦作",
                    "value": "f89a2d8d0a5c4519a3aca43ba766b5e5"
                }, {
                    "children": [{"label": "华龙区", "value": "3a4a13f3ad5542ff90d0aa44e72bb216"}, {
                        "label": "濮阳县",
                        "value": "ca0f2423fc1745f8b4b2fbbc360c94a5"
                    }, {"label": "南乐县", "value": "729cbfa2e422430cb105bb21378383e1"}, {
                        "label": "台前县",
                        "value": "74ca1b3ee4bf4c37914decd1bc70e90a"
                    }, {"label": "清丰县", "value": "2aa4a6a72bab4739a551230bbcec5702"}, {
                        "label": "范县",
                        "value": "69aa5ad026e246d48f6d1726638f15e4"
                    }, {"label": "其他", "value": "3ebfae6a9fd043a1aee55663fb6d786a"}],
                    "label": "濮阳",
                    "value": "f33a762ff86246ba9b5ebcefe88ba308"
                }, {
                    "children": [{"label": "魏都区", "value": "2bc569e584fe4ef98af7023bce76eee1"}, {
                        "label": "禹州市",
                        "value": "885336d77b3941cbbdcd17f8d4d4909c"
                    }, {"label": "长葛市", "value": "eefc1760fe5248708a7c409b83c1d6d5"}, {
                        "label": "许昌县",
                        "value": "99a975bc442842a6b8f41e0712c753f4"
                    }, {"label": "鄢陵县", "value": "203ca633d63a44a69df78438e9ec615b"}, {
                        "label": "襄城县",
                        "value": "909224173e9640f4b1783a571acbe104"
                    }, {"label": "其他", "value": "f4c52e6c26604873995daa9fadfe499a"}],
                    "label": "许昌",
                    "value": "ba5cc8fa69074b4984a6f208a2407af6"
                }, {
                    "children": [{"label": "源汇区", "value": "04f547f11e764fe887fb2f25b758c159"}, {
                        "label": "郾城区",
                        "value": "b3e362d31d1e4b48a0df05b87a4636fd"
                    }, {"label": "召陵区", "value": "96cecc88243a47e5a954dc6d5769ba3a"}, {
                        "label": "临颍县",
                        "value": "bb69beffbe0d445ab0b6f6768123d8b9"
                    }, {"label": "舞阳县", "value": "6263455b09cb493ab4aa573b8feb366f"}, {
                        "label": "其他",
                        "value": "a3386eb2ee7643eaba038ba0a2508b96"
                    }], "label": "漯河", "value": "f414faab30eb450d92c99adb2939ea93"
                }, {
                    "children": [{"label": "湖滨区", "value": "e7f579a92c524d16bcfd983c502b6a2d"}, {
                        "label": "义马市",
                        "value": "8952c47734524c359f5d2607f88e6ba1"
                    }, {"label": "灵宝市", "value": "77cc7b28b71b497ca12989ad9bd81fbf"}, {
                        "label": "渑池县",
                        "value": "06dc41c51be24823a155dd102a58927b"
                    }, {"label": "卢氏县", "value": "0fc93760d3624bc3bd0f6344bbbbb3e6"}, {
                        "label": "陕县",
                        "value": "d6ca5122b01d4c2392793cb2612c5efb"
                    }, {"label": "其他", "value": "ee6edf33c3f54527af0f5d0dba1a10e4"}],
                    "label": "三门峡",
                    "value": "3b17395e9e3c4ee5ba7cf92ad4884f87"
                }, {
                    "children": [{"label": "卧龙区", "value": "4b54795cb53f4dc393e6d04d23a70a26"}, {
                        "label": "宛城区",
                        "value": "1662314cf6a34821be02a0145de5b438"
                    }, {"label": "邓州市", "value": "a3b4d539675d4e2c8bb28e839d6ca754"}, {
                        "label": "桐柏县",
                        "value": "095004d955c545a9b864cbeea797b256"
                    }, {"label": "方城县", "value": "d6d27e0cc429435abdbaf8920847932f"}, {
                        "label": "淅川县",
                        "value": "1170ea77adba47fc884aeabe0e7d0bb3"
                    }, {"label": "镇平县", "value": "853aae523f6d482f8e46a1d57c9259ce"}, {
                        "label": "唐河县",
                        "value": "b6bc1909142a49359fae2f253cb5315a"
                    }, {"label": "南召县", "value": "853b9b6cfeb0490092d683e61865d2b4"}, {
                        "label": "内乡县",
                        "value": "247c3fd4a60b498791f5f07f87f0f8b1"
                    }, {"label": "新野县", "value": "c5131a4abd2f4e68a0f3a267eb501885"}, {
                        "label": "社旗县",
                        "value": "0e40164967fe494081ef85e226a26d87"
                    }, {"label": "西峡县", "value": "bb8cdde316dd4343856abdf98c615c8a"}, {
                        "label": "其他",
                        "value": "c3a2093578c44a4ea4a85cb2c4e1bfaa"
                    }], "label": "南阳", "value": "a7ea1f4a36ef4fd5a5090f8c87ca99a2"
                }, {
                    "children": [{"label": "梁园区", "value": "5aad8359bef0440f96136dce8f9c2fd5"}, {
                        "label": "睢阳区",
                        "value": "34995a24679f4b8ba34a3f3740389ad5"
                    }, {"label": "永城市", "value": "bedb57f060494d0b95c5ef9ff4afb7a9"}, {
                        "label": "宁陵县",
                        "value": "3d57bc2563a04667b9bdaf99a6c3e5e6"
                    }, {"label": "虞城县", "value": "441a7f164bb1449c929a70606a248ce6"}, {
                        "label": "民权县",
                        "value": "a6dfff95316f47daa4f9e1e75e7cefa1"
                    }, {"label": "夏邑县", "value": "d4c43b99690f496aa10bb8217665dae4"}, {
                        "label": "柘城县",
                        "value": "94a67238bc0640b9874effb74e32c00b"
                    }, {"label": "睢县", "value": "354d3f673eda4f1f8aa6cca456514c6c"}, {
                        "label": "其他",
                        "value": "8a8fb0e103f7440a87cde63d1f40a22e"
                    }], "label": "商丘", "value": "e3fe1a60b10648eeaaf247c2ad313337"
                }, {
                    "children": [{"label": "浉河区", "value": "a9c2358b230e4991b0610b6ca65b22e8"}, {
                        "label": "平桥区",
                        "value": "28fc8baeda1546b681554159159fbd53"
                    }, {"label": "潢川县", "value": "46a8064d634d44d39d5e8bfc4d685b14"}, {
                        "label": "淮滨县",
                        "value": "792eb0646dc34275b4b7b8cf73e5350c"
                    }, {"label": "息县", "value": "aeeb5f201bad419388ce8a214230e4b9"}, {
                        "label": "新县",
                        "value": "428cf5fe34c34877b3f8c230ba54b157"
                    }, {"label": "商城县", "value": "ac5dda7f283048db8f74faeca27a0dff"}, {
                        "label": "固始县",
                        "value": "21da69a5e576445e94ad6b247a3d1813"
                    }, {"label": "罗山县", "value": "27403c8c227b42f3b41c174f1eb96fc2"}, {
                        "label": "光山县",
                        "value": "bb5fc68f15c54a388f41b0336c28b237"
                    }, {"label": "其他", "value": "de44d76fcee24b5a80f071ca48d850d5"}],
                    "label": "信阳",
                    "value": "cbbc0d8defb1444b9df8263ba2e95817"
                }, {
                    "children": [{"label": "川汇区", "value": "710c1a0055294eb58e3ae612b27d1ffb"}, {
                        "label": "项城市",
                        "value": "48b884dc5ddb4d378ee985eccb6966e1"
                    }, {"label": "商水县", "value": "165515d95d46470ba701a81c5d0adb01"}, {
                        "label": "淮阳县",
                        "value": "9e701f40126b47cab20f952a89abbf6c"
                    }, {"label": "太康县", "value": "8cb94359b5d645f697b8161e12ad3b01"}, {
                        "label": "鹿邑县",
                        "value": "ea81e67e71a24088aadeeb9f30b2c36b"
                    }, {"label": "西华县", "value": "cb38ef5d479b4504950a8c51a57b4e76"}, {
                        "label": "扶沟县",
                        "value": "1b9e5440a88d413f83720f5603b83073"
                    }, {"label": "沈丘县", "value": "d474951416af495a861c609caa782fca"}, {
                        "label": "郸城县",
                        "value": "64ad74f773734adda2ab216dc2be9f6e"
                    }, {"label": "其他", "value": "eebd1d6a0b8747d9b3f1580aa4f9c7a1"}],
                    "label": "周口",
                    "value": "327c598463db46819e3a8f0b160c2ca6"
                }, {
                    "children": [{"label": "驿城区", "value": "7c43c20e1bd84ff9b82b24c8f83663dc"}, {
                        "label": "确山县",
                        "value": "3b685e0ebda14a138d5c6d0d272ba09c"
                    }, {"label": "新蔡县", "value": "d9e939d8c25846de8f5f62226efa57d3"}, {
                        "label": "上蔡县",
                        "value": "e808e06e7c0f431ba6c31d23202bf0f6"
                    }, {"label": "西平县", "value": "b46d64c1747c4a0faef900e97aa20048"}, {
                        "label": "泌阳县",
                        "value": "6172beac523b473cb8078de29190d5a8"
                    }, {"label": "平舆县", "value": "8207e39902e84578b02b45dff9c3b212"}, {
                        "label": "汝南县",
                        "value": "07327227331c4bcea49c9699f1908078"
                    }, {"label": "遂平县", "value": "14249e0fdb61419ba345c530dc86e2f6"}, {
                        "label": "正阳县",
                        "value": "954d226b7805442e8d68770076b4cb03"
                    }, {"label": "其他", "value": "099fea1e61b444c2aae50ec031dcea68"}],
                    "label": "驻马店",
                    "value": "2a73e12d463a4360af856390c248dd37"
                }, {
                    "children": [{"label": "济源市", "value": "4d248e02bb93478683702b3f0016dfd1"}, {
                        "label": "其他",
                        "value": "4de131770e3645a79aa980e8565232be"
                    }], "label": "焦作", "value": "6a4073ec74fb49f3956e00f7c478d76f"
                }, {
                    "children": [{"label": "其他", "value": "53a07a834567419eb12f368d7001761c"}],
                    "label": "其他",
                    "value": "831dbf68248843d19e2bdda99df6b707"
                }], "label": "河南", "value": "8ba0f4966c7545dbb4b8ee84b160243d"
            }, {
                "children": [{
                    "children": [{
                        "label": "江岸区",
                        "value": "6f1e96d6573847ea8293b0b45510e7e1"
                    }, {"label": "武昌区", "value": "07352a29cba1410490df93f476cc3690"}, {
                        "label": "江汉区",
                        "value": "24f0e0b6144b4a8dabc24b29be457950"
                    }, {"label": "硚口区", "value": "e4fc21abb9b94beca144cdc0b9f31377"}, {
                        "label": "汉阳区",
                        "value": "a808039349834f1fabdd798b6d1ba20a"
                    }, {"label": "青山区", "value": "bbdb06b58d0d450c84ac3f9ad2c910a2"}, {
                        "label": "洪山区",
                        "value": "e9d1b0dea24c44c39c07b443be02f6d4"
                    }, {"label": "东西湖区", "value": "1094970832244f229fd9a3b2c735ba33"}, {
                        "label": "汉南区",
                        "value": "e0fc0babf85142c0a78cc73e115235cc"
                    }, {"label": "蔡甸区", "value": "3d4cd78215d64e47a8f9f6362fd6f1e7"}, {
                        "label": "江夏区",
                        "value": "9b5ba4dfff6844798f360ef350117a55"
                    }, {"label": "黄陂区", "value": "fcbaf9dbe9714f7d8b15c5c7fc4aaf07"}, {
                        "label": "新洲区",
                        "value": "1c2f07f7a3874486b7868a7f254a8e38"
                    }, {"label": "其他", "value": "38be52396b2a4ab2bd64ddae7a7c1891"}],
                    "label": "武汉",
                    "value": "334ae98fee81423fa73c502a986c0297"
                }, {
                    "children": [{"label": "黄石港区", "value": "b3952baec9f54800a4888eee5f7d2cf4"}, {
                        "label": "西塞山区",
                        "value": "14096f2cf79047578d70a4f401d3beef"
                    }, {"label": "下陆区", "value": "06a0f9385e3f4f7bb16fa3944440ffe7"}, {
                        "label": "铁山区",
                        "value": "1bb515588649410c9cbf0270fa1dff12"
                    }, {"label": "大冶市", "value": "21e14ad22d31453fab55eeac0593b84b"}, {
                        "label": "阳新县",
                        "value": "687eeeb3b27b4de797af3cfea6382adf"
                    }, {"label": "其他", "value": "1977dfb79a8140db95883ef3b51c21fa"}],
                    "label": "黄石",
                    "value": "355dfb93f6954eb38035b0a8366b4a3e"
                }, {
                    "children": [{"label": "张湾区", "value": "66eb98643fcc4c07a3f145d2a88f1ea7"}, {
                        "label": "茅箭区",
                        "value": "b333cd73989d470eb095399fbe7a6c8d"
                    }, {"label": "丹江口市", "value": "4d00670174a14e66b670d3a4cf0d7576"}, {
                        "label": "郧县",
                        "value": "eda67ef6089d4653b54ba1dc737d6559"
                    }, {"label": "竹山县", "value": "e8ff446ef7dd4e63850296829b052954"}, {
                        "label": "房县",
                        "value": "863506a3cf8d429f9580f880a79327e7"
                    }, {"label": "郧西县", "value": "6492f7b80efd426d84b93bd1e3bc2dff"}, {
                        "label": "竹溪县",
                        "value": "017eacb30bcb43d585a5eee16183e416"
                    }, {"label": "其他", "value": "21a58eaaf80c4e999df61eece0cee26c"}],
                    "label": "十堰",
                    "value": "20f81c7a64e04c039883989679386c18"
                }, {
                    "children": [{"label": "沙市区", "value": "bca90f0fee644e0c89d2416be7c995b2"}, {
                        "label": "荆州区",
                        "value": "2f75649e7db34c55aef7c1c0554cc061"
                    }, {"label": "洪湖市", "value": "051f8e58466b425ba663a12c87e2a7f2"}, {
                        "label": "石首市",
                        "value": "74f55f7e244e4cf0bfc75066b4d4bb70"
                    }, {"label": "松滋市", "value": "b03acfa2bac740e297bb92a4423aed2e"}, {
                        "label": "监利县",
                        "value": "35f8951bec8a4924a922f0f1ac384076"
                    }, {"label": "公安县", "value": "ad0bd9f0de794fc4be4796a83e7e5184"}, {
                        "label": "江陵县",
                        "value": "e4f07f128dda463594adf92eb402fc69"
                    }, {"label": "其他", "value": "27082447a70d412894a4694f780daa56"}],
                    "label": "荆州",
                    "value": "084871039b614d4ea0f375d3f0d99892"
                }, {
                    "children": [{"label": "西陵区", "value": "18a3f298dc034d0d8f317642e127bba2"}, {
                        "label": "伍家岗区",
                        "value": "94c926ac26f64a7b946ba57f96264e03"
                    }, {"label": "点军区", "value": "cac8695149904ceaaeadf78a279dc35f"}, {
                        "label": "猇亭区",
                        "value": "10fb3e644e9b4fe6bf04f787b332b098"
                    }, {"label": "夷陵区", "value": "0be474d9934c490ea7ec450aecec8ee3"}, {
                        "label": "宜都市",
                        "value": "c13694c2cdc445bab97bf40fa7144831"
                    }, {"label": "当阳市", "value": "4b05158bc14145e68f59a4fc41f2c907"}, {
                        "label": "枝江市",
                        "value": "18531cec2b2c4e1ba32240b3e784630b"
                    }, {"label": "秭归县", "value": "44ec7ab07cff475aa55109ddbe13f7d5"}, {
                        "label": "远安县",
                        "value": "0df5304224a646deb9ef665eb4d31618"
                    }, {"label": "兴山县", "value": "f02074023f8641f1aa6e9c91ffab5d8f"}, {
                        "label": "五峰土家族自治县",
                        "value": "278d31be71a64183855bd8f9454c5a8e"
                    }, {"label": "长阳土家族自治县", "value": "26c6740c3fa54d3789e684ca4aa254d2"}, {
                        "label": "其他",
                        "value": "edd31184f9544ec5b6d17425dca5e8f6"
                    }], "label": "宜昌", "value": "655af509784644f4b4f33dab305f1ec0"
                }, {
                    "children": [{"label": "襄城区", "value": "2321a62d6bc843b99b532aaf65ad5e45"}, {
                        "label": "樊城区",
                        "value": "7b41ba42917e4c9d8bf45b5de1682753"
                    }, {"label": "襄阳区", "value": "57e14f677f024b5d99f92ac4d54afa0d"}, {
                        "label": "老河口市",
                        "value": "6f919a464c704e238cfe358afddf7996"
                    }, {"label": "枣阳市", "value": "1920624b34544c9488656c7102b4bb2c"}, {
                        "label": "宜城市",
                        "value": "84109aa6fe5d475f8db5e4990de8d432"
                    }, {"label": "南漳县", "value": "57efd238c14846afb6e9941b64bb4c41"}, {
                        "label": "谷城县",
                        "value": "5b9d7d700a4e44de98948dd157a39164"
                    }, {"label": "保康县", "value": "1e7d11f32d8d4c3396d1b0c745214ecb"}, {
                        "label": "其他",
                        "value": "9c9a57185d8b4d3d99355d742b26ed38"
                    }], "label": "襄樊", "value": "e9b24d2ffa8943ca894ef3310856e106"
                }, {
                    "children": [{"label": "鄂城区", "value": "106c1850bbf14d98b5470e8ad2f2e389"}, {
                        "label": "华容区",
                        "value": "1f4b9987d5c648d4959b43334bd69849"
                    }, {"label": "梁子湖区", "value": "4dc8eb3884ab45168dd1732317d4e5ed"}, {
                        "label": "其他",
                        "value": "1b08c8a71e4f4a57a08d40074457a5f4"
                    }], "label": "鄂州", "value": "52655fcfe079463881811a173c6e9363"
                }, {
                    "children": [{"label": "东宝区", "value": "0fbfb608bf40418d93925bbc40fdac5e"}, {
                        "label": "掇刀区",
                        "value": "72a692efe210469998a311ee7425c83a"
                    }, {"label": "钟祥市", "value": "66ad3a3a6ea4496fbe78155c876c0d8c"}, {
                        "label": "京山县",
                        "value": "5ca06fa628eb444bb5cbcebe25815285"
                    }, {"label": "沙洋县", "value": "bdcb0567a4364b25bd1868d01a96ff1a"}, {
                        "label": "其他",
                        "value": "882394004dbc467d8c02d2ee32c1390e"
                    }], "label": "荆门", "value": "40626b7d986a4dc792095247da7bd119"
                }, {
                    "children": [{"label": "孝南区", "value": "345364f030e74dcaa6b2e7f5a1769cf4"}, {
                        "label": "应城市",
                        "value": "48d9f982558f4607b1777719953791a4"
                    }, {"label": "安陆市", "value": "f7ff3925ff4d4dddbc7c3d37d73c15a6"}, {
                        "label": "汉川市",
                        "value": "8a706f1d66b14c4c857b82e7f6592a96"
                    }, {"label": "云梦县", "value": "c67380cdb6ab4da89878866d464f3252"}, {
                        "label": "大悟县",
                        "value": "abc5d499b4d64c959db743e5440031a8"
                    }, {"label": "孝昌县", "value": "2a260d0078274b1db1f064833895e8f4"}, {
                        "label": "其他",
                        "value": "ac48e4c890754f8ab2c6035c92626e89"
                    }], "label": "孝感", "value": "3455eecd7daf484480e50dcc5fb4db4f"
                }, {
                    "children": [{"label": "黄州区", "value": "0718d8818e7e4dedbb57563457fff4c9"}, {
                        "label": "麻城市",
                        "value": "240960601d4c4376926cc56bb7f4804e"
                    }, {"label": "武穴市", "value": "4a8d5b149cfc401494224f228083ac1e"}, {
                        "label": "红安县",
                        "value": "3255765d1ca04ff1ae578923180dc5ed"
                    }, {"label": "罗田县", "value": "182aad9f650a4851af37f33b306587fd"}, {
                        "label": "浠水县",
                        "value": "3758b5bb13ce4963a5407f4cd8b121f9"
                    }, {"label": "蕲春县", "value": "cb6c18d05e714500b7f5249facd9f11c"}, {
                        "label": "黄梅县",
                        "value": "be62ab8adbdb4ee8bec937414fabe363"
                    }, {"label": "英山县", "value": "21d0cd5eef0d4147a4906c8591e4980a"}, {
                        "label": "团风县",
                        "value": "dde73f4a44004633a01e51c85d22d467"
                    }, {"label": "其他", "value": "a5135c7d70bb457092bbb43c1785a89b"}],
                    "label": "黄冈",
                    "value": "3a1ca026189e4b40aee5e94c06618ac0"
                }, {
                    "children": [{"label": "咸安区", "value": "cdb8c63e315c45da8dc77e95158fc5da"}, {
                        "label": "赤壁市",
                        "value": "288c66b9177e4905ad383a87c77d49f9"
                    }, {"label": "嘉鱼县", "value": "8609ffdcd5f24353af9aebf6e5f85265"}, {
                        "label": "通山县",
                        "value": "f2e88832b60a46b1aa48168b71551588"
                    }, {"label": "崇阳县", "value": "e979355a77094c828233fa75bb449e15"}, {
                        "label": "通城县",
                        "value": "3e74c8de898346908ad28a82be5df641"
                    }, {"label": "其他", "value": "5059a7edc97d49e3a444a8631c8a93e5"}],
                    "label": "咸宁",
                    "value": "56944dff55bf43b4832dcda6846dfb59"
                }, {
                    "children": [{"label": "曾都区", "value": "d67eddcb005648b09fa59af72858aab3"}, {
                        "label": "广水市",
                        "value": "b0f94c456ad94f6899aba21e0a6bd61d"
                    }, {"label": "其他", "value": "1915ef7d15674cdfa168ce55914954f7"}],
                    "label": "随州",
                    "value": "5b55777d20ff422f83390bdd13b52338"
                }, {
                    "children": [{"label": "恩施市", "value": "119489db4c834bf0b483810933d0c41d"}, {
                        "label": "利川市",
                        "value": "0874659e907048259d1ab26a4bed8386"
                    }, {"label": "建始县", "value": "af6562a47545448b85788bf563b1a08d"}, {
                        "label": "来凤县",
                        "value": "fc1f45f7cccc489e8ee3ffa4eea4b705"
                    }, {"label": "巴东县", "value": "22c7be65d509487e8932912910f157b8"}, {
                        "label": "鹤峰县",
                        "value": "7c7a749a38394748abaa458eec79302b"
                    }, {"label": "宣恩县", "value": "76f87c0c4ae0404cb0b341d3e1bbc0b2"}, {
                        "label": "咸丰县",
                        "value": "a7a59e81c6e94218a67d01d5eedc517b"
                    }, {"label": "其他", "value": "0c78408ddcaa4cb3af89c3fc88207271"}],
                    "label": "恩施土家族苗族自治州",
                    "value": "f72116c6d2024ff18578e9245c66e911"
                }, {
                    "children": [{"label": "仙桃", "value": "197c9ceee3084a5b8f21e319161961d6"}],
                    "label": "仙桃",
                    "value": "416da00dcbf4477e854e69a7d5ae8585"
                }, {
                    "children": [{"label": "天门", "value": "334be9f283db4883bba7359bd767e9fb"}],
                    "label": "天门",
                    "value": "11af87aae3fb45be95da0e9737dfe80b"
                }, {
                    "children": [{"label": "潜江", "value": "2f1b050747034f9db8c85896930093d3"}],
                    "label": "潜江",
                    "value": "581a5851c827410f860beea21ab6eaac"
                }, {
                    "children": [{"label": "神农架林区", "value": "7fe3ba4045994ee1b2b694851b34a29f"}],
                    "label": "神农架林区",
                    "value": "fa4f5a50712247c682a065d30f1e75d9"
                }, {
                    "children": [{"label": "其他", "value": "a15e7de04ca1467995a9bc3af109ab42"}],
                    "label": "其他",
                    "value": "3d9474956e894fdbad058508e17cfef4"
                }], "label": "湖北", "value": "8e1eca24cfeb4427a91cc285afb099f5"
            }, {
                "children": [{
                    "children": [{
                        "label": "岳麓区",
                        "value": "ea830717f6194dbeae1d4027d30c8696"
                    }, {"label": "芙蓉区", "value": "19a6d33d3b3f4162992b0e9d74dc4e65"}, {
                        "label": "天心区",
                        "value": "61418f2bbc584f5480f2b848190946c3"
                    }, {"label": "开福区", "value": "2fee4018702e463c9efe4405fe9f3f30"}, {
                        "label": "雨花区",
                        "value": "9977f4df01624d4894aafca750d4117f"
                    }, {"label": "浏阳市", "value": "87717a6a4fd94cf48ab91421865a20a8"}, {
                        "label": "长沙县",
                        "value": "a6fa0587995b4d5a87816ca16adc7ea7"
                    }, {"label": "望城县", "value": "dde317a0fca7488f9d7e5004b82fc014"}, {
                        "label": "宁乡县",
                        "value": "85abea098b5c4c1e9640cb3e340a0229"
                    }, {"label": "其他", "value": "468a6e964b264ec6bbd8b0c24c2e1658"}],
                    "label": "长沙",
                    "value": "ca870e7282c946fabea5615d430df648"
                }, {
                    "children": [{"label": "天元区", "value": "fc50c411cedd4396bb553d56f426b2bf"}, {
                        "label": "荷塘区",
                        "value": "03261559dc5d4d72b5b8f19d6edd7ed2"
                    }, {"label": "芦淞区", "value": "fba3babc7479489b834f1cb885a0dc23"}, {
                        "label": "石峰区",
                        "value": "ff2b65d5223e42f0b6f7714e753644d0"
                    }, {"label": "醴陵市", "value": "327d2066b976422fa7aa4f697e88880d"}, {
                        "label": "株洲县",
                        "value": "af3bd964edcf42eea40952b2c5e5d794"
                    }, {"label": "炎陵县", "value": "a3407e34b2bd4ec6b33116779a190486"}, {
                        "label": "茶陵县",
                        "value": "a83ddca0a892440387c3308875d5e125"
                    }, {"label": "攸县", "value": "89c87c4c874c42b99adf2bc0a2186a02"}, {
                        "label": "其他",
                        "value": "180e3bd49be947cca8573239009af6b6"
                    }], "label": "株洲", "value": "0ffc37a4c26b44dba8cce2792251a6e3"
                }, {
                    "children": [{"label": "岳塘区", "value": "7cc5e61bb5ee414793aeb4f0eff5face"}, {
                        "label": "雨湖区",
                        "value": "bec688ced4ea40e7ac0499ed4403873e"
                    }, {"label": "湘乡市", "value": "fa335a05d08a4e8880bcba1be2b124d3"}, {
                        "label": "韶山市",
                        "value": "0ef6347c7d8a419ba5f07acd48fa81ee"
                    }, {"label": "湘潭县", "value": "80cb908f5a194f699a6bbdaf6a90bd2b"}, {
                        "label": "其他",
                        "value": "aa212a6151fe4a6d86f0edd6ae5abffa"
                    }], "label": "湘潭", "value": "f255ba008d7a474095d5a425a7527593"
                }, {
                    "children": [{"label": "雁峰区", "value": "1ce8e0cbc80d4790ae0dd715622588a9"}, {
                        "label": "珠晖区",
                        "value": "7439df92bc8f4f04bb192e07f5cbe162"
                    }, {"label": "石鼓区", "value": "6b0d738eceb94ac2a17090b9cd1d918b"}, {
                        "label": "蒸湘区",
                        "value": "ef8c0bcee37f4d15a5282b1f2b78d8b4"
                    }, {"label": "南岳区", "value": "bff9ad028f8b4326aca5db2d3d749cd9"}, {
                        "label": "耒阳市",
                        "value": "200dd035a4784f09a0e57385ab162350"
                    }, {"label": "常宁市", "value": "b0eb154341d644c2bd47f9bbf84f07ae"}, {
                        "label": "衡阳县",
                        "value": "92c6e7471658494cb0af5a33cdfa74db"
                    }, {"label": "衡东县", "value": "0de0b1beae994085aecc374742be116d"}, {
                        "label": "衡山县",
                        "value": "6ddfcafdfc1b4318b570493cbca55e94"
                    }, {"label": "衡南县", "value": "f1936259989349faa817067d345a4617"}, {
                        "label": "祁东县",
                        "value": "d2654bc56aa649539bf0ad951ca2cbb7"
                    }, {"label": "其他", "value": "e1344b5a0bb04beb97c3cf228322b1e6"}],
                    "label": "衡阳",
                    "value": "b7602250a7a14cedb354276857a7bec2"
                }, {
                    "children": [{"label": "双清区", "value": "8301faf8111447a2a58caa10ab43e236"}, {
                        "label": "大祥区",
                        "value": "7d3603400dad4efb8c354b1dc4da0088"
                    }, {"label": "北塔区", "value": "3bdfe03ad5114fc9b20c38337007879d"}, {
                        "label": "武冈市",
                        "value": "16b45e8dd940497099f70ddd7d477f17"
                    }, {"label": "邵东县", "value": "48473346863f4bc4ab570f35860882ae"}, {
                        "label": "洞口县",
                        "value": "edf6b6bb725447c295b079e1bc2976de"
                    }, {"label": "新邵县", "value": "65485fcca6da48698de077a778f5b212"}, {
                        "label": "绥宁县",
                        "value": "dbb9f76c35e4476999e96f13631095bb"
                    }, {"label": "新宁县", "value": "789c49d827e8447e9217220adb86524d"}, {
                        "label": "邵阳县",
                        "value": "5ba257ef19d441b1a7b99dea0b9987c9"
                    }, {"label": "隆回县", "value": "ffcbb6bc4e774a6d86f69c3a47aa06e0"}, {
                        "label": "城步苗族自治县",
                        "value": "b104754dd3104248a177c230a930fb32"
                    }, {"label": "其他", "value": "73843e330a484a02bda3cf983f469983"}],
                    "label": "邵阳",
                    "value": "2e877f32b8d24f278eb6bd8b5dede449"
                }, {
                    "children": [{"label": "岳阳楼区", "value": "28e7faf82a644655b9e463436ef00de7"}, {
                        "label": "云溪区",
                        "value": "8956f272457041a3bc46aa022c379a88"
                    }, {"label": "君山区", "value": "cafe10b7230b4449a314b9f72e0d74e7"}, {
                        "label": "临湘市",
                        "value": "e6a4058fe49a4d97bf6dabdcd9a6b0b2"
                    }, {"label": "汨罗市", "value": "4318c7d0b5ab458f915b3cd575c9286a"}, {
                        "label": "岳阳县",
                        "value": "17e9e5dc3e78453c8127c578d70cf4ef"
                    }, {"label": "湘阴县", "value": "45f8f2ae85f94b65a411440431b9f067"}, {
                        "label": "平江县",
                        "value": "aeaec29b4eb14f328ba1071f59eb73e7"
                    }, {"label": "华容县", "value": "7df6a57e0a524f14b3e7d499cd879532"}, {
                        "label": "其他",
                        "value": "1e248c144b1e4440ae927ba358897b06"
                    }], "label": "岳阳", "value": "f2aa209ab2fa4896a1a54237402cc5c0"
                }, {
                    "children": [{"label": "武陵区", "value": "237a4bc08cd14b8b8af62fc1e4aec0d7"}, {
                        "label": "鼎城区",
                        "value": "30456cbf4f724bf1a34592a99d0a7cb0"
                    }, {"label": "津市市", "value": "442f62ae34414318aeca64a7878b94c4"}, {
                        "label": "澧县",
                        "value": "e876fd183c6a4270bd12226d0c20ea24"
                    }, {"label": "临澧县", "value": "3882d4d2698946588ed5763cf3dc8e94"}, {
                        "label": "桃源县",
                        "value": "bcb4c0b586b04ada9dca253514a8ca34"
                    }, {"label": "汉寿县", "value": "eaa275e1f08545778b529704dcccd40c"}, {
                        "label": "安乡县",
                        "value": "3a66b4ae99b04564ad615c7024c1dbf0"
                    }, {"label": "石门县", "value": "64c6141669644af6b289691372cb924f"}, {
                        "label": "其他",
                        "value": "eaec4dd820644c718835d2efe3659130"
                    }], "label": "常德", "value": "85115125d5c741b084bba4a63f7eb3e1"
                }, {
                    "children": [{"label": "永定区", "value": "ab59b9824d3a423e8bf9c5dd7091b308"}, {
                        "label": "武陵源区",
                        "value": "f033578c075649a9b1191160889834b0"
                    }, {"label": "慈利县", "value": "12ea60b89934478aa6660d385c58a271"}, {
                        "label": "桑植县",
                        "value": "9d7618ac5141436fa7f1fc94e42b3266"
                    }, {"label": "其他", "value": "0b3aa63222924c4c94e7115dd9636c36"}],
                    "label": "张家界",
                    "value": "1576869857444a71971ce881b2819c55"
                }, {
                    "children": [{"label": "赫山区", "value": "152ae76e5c7c48dd958a0c1f4492961d"}, {
                        "label": "资阳区",
                        "value": "a1b1437763fc430bbd2261d7b223dd6c"
                    }, {"label": "沅江市", "value": "5998e96cdfd544ae955b4a23e6738daf"}, {
                        "label": "桃江县",
                        "value": "dc1259f0d2fe40aeaa3666dbd88def17"
                    }, {"label": "南县", "value": "d0e16d14774a43d2b6603c8aa8af8c0f"}, {
                        "label": "安化县",
                        "value": "038567d7a1f145f79f0984ab90ecd262"
                    }, {"label": "其他", "value": "dfbe9b9d206d4b23a184434b21b76a3e"}],
                    "label": "益阳",
                    "value": "46bbe4a986a44e4e9a8ef6590bfd7ddc"
                }, {
                    "children": [{"label": "北湖区", "value": "00b7783788064181bc4b598411e0c966"}, {
                        "label": "苏仙区",
                        "value": "61efce5f948a4d10af04a28d730ab776"
                    }, {"label": "资兴市", "value": "51726d0e69304981811b5221e4a78cc2"}, {
                        "label": "宜章县",
                        "value": "c9d7ffc271bb4a2787a71892b88c41ed"
                    }, {"label": "汝城县", "value": "5c69f774638e412a922dffb2e4209ae9"}, {
                        "label": "安仁县",
                        "value": "7066eb06725347e79642b99d07901ad5"
                    }, {"label": "嘉禾县", "value": "306f693d14f24429a2763c72a88c7767"}, {
                        "label": "临武县",
                        "value": "68780c3298ad4a3ca2edd20047a5ac37"
                    }, {"label": "桂东县", "value": "1f5a9b64cb3e46978baa4d1abeaca135"}, {
                        "label": "永兴县",
                        "value": "14b30c818d1c4278b78d85935b083246"
                    }, {"label": "桂阳县", "value": "69ef3c2249244f9db052c28960f545b9"}, {
                        "label": "其他",
                        "value": "64a9d82388d34f15b7cbf9844e9ea78a"
                    }], "label": "郴州", "value": "ef54340868474cef97ba5e90da2326dd"
                }, {
                    "children": [{"label": "冷水滩区", "value": "57e6fd5b5a5a400e937a07141080953c"}, {
                        "label": "零陵区",
                        "value": "d4cf1e6930574155adaa3b3c1cd4cd4e"
                    }, {"label": "祁阳县", "value": "c6c99b4618a541e0a8ef1113d94441db"}, {
                        "label": "蓝山县",
                        "value": "d6c5d0a68dab40e28271103e3f58bf88"
                    }, {"label": "宁远县", "value": "da09a7c107f346f0b5ec29a0d2ed2f27"}, {
                        "label": "新田县",
                        "value": "3926db4b715b4dfb86a243b17e57decd"
                    }, {"label": "东安县", "value": "1d69107880404e288196d295b099ec15"}, {
                        "label": "江永县",
                        "value": "f46a39a32dc442aeb17bfc4485b3e5fb"
                    }, {"label": "道县", "value": "565b853fee5541af9de4be646b089cac"}, {
                        "label": "双牌县",
                        "value": "13f2dcf0510b43e4aab95de0f6f1e7f5"
                    }, {"label": "江华瑶族自治县", "value": "8ac2ab286631419c8b5244f8f928b489"}, {
                        "label": "其他",
                        "value": "fdf8d02f39304b108b6de4f4d5478c0c"
                    }], "label": "永州", "value": "230bcd78c5ab43b594f6c375fa9ff332"
                }, {
                    "children": [{"label": "鹤城区", "value": "01dfb35d88424caf90a3f78decb432a1"}, {
                        "label": "洪江市",
                        "value": "491f96f5dc6845fba0dafe662bb55316"
                    }, {"label": "会同县", "value": "68935facfe914aa7b43abf9e1916c3f8"}, {
                        "label": "沅陵县",
                        "value": "fcd6049594054f888fb29de59cb46372"
                    }, {"label": "辰溪县", "value": "42079dfc1ef84b368f7a17d7289d4aa9"}, {
                        "label": "溆浦县",
                        "value": "8da4060e663b4ee5b240983e382f367f"
                    }, {"label": "中方县", "value": "4dc446fb1bc44ab8b3d41098e6dbf395"}, {
                        "label": "新晃侗族自治县",
                        "value": "91635b5b2a6e429fa115292a1502be1b"
                    }, {"label": "芷江侗族自治县", "value": "ca8041672df24f8bb225bfaa9aa7e007"}, {
                        "label": "通道侗族自治县",
                        "value": "f1b0d0a54f804b209f50f5295708c3ae"
                    }, {"label": "靖州苗族侗族自治县", "value": "4d70fd25490a49db8f7cfcf21d7c1c48"}, {
                        "label": "麻阳苗族自治县",
                        "value": "82572540c8bc49f18d13a748b0a21d11"
                    }, {"label": "其他", "value": "a7f6c83ade354675ba723f38bd45cda5"}],
                    "label": "怀化",
                    "value": "fadd2370052a44b3a1dc20f8996e6316"
                }, {
                    "children": [{"label": "娄星区", "value": "d1b3355b41d148d49b12c3bb7e2ec4c9"}, {
                        "label": "冷水江市",
                        "value": "44b4c598cf1647729d95123096f27c49"
                    }, {"label": "涟源市", "value": "aa2a44b1eab14608b9f06548103ee9e4"}, {
                        "label": "新化县",
                        "value": "5361709edf7f49858ef4259199b41659"
                    }, {"label": "双峰县", "value": "2c03c920ee734e3c8742663e6054cb13"}, {
                        "label": "其他",
                        "value": "0bb03d70fcc64bb9947d6c68a0f3da78"
                    }], "label": "娄底", "value": "438d007a4bd54bfca299be77e6a4cb21"
                }, {
                    "children": [{"label": "吉首市", "value": "cc67b2bc46a94830b251ba4736d0a090"}, {
                        "label": "古丈县",
                        "value": "151fb32919ca48b7888af5a5444be7d4"
                    }, {"label": "龙山县", "value": "b3fb8bf8298c4d58b2613b71e633444a"}, {
                        "label": "永顺县",
                        "value": "94e581585e764ba498714fcc3e74b755"
                    }, {"label": "凤凰县", "value": "bd5e1aa9704b41a6ac0289d2f9ffbf12"}, {
                        "label": "泸溪县",
                        "value": "63d1d7af2761418094fd70dd78798f58"
                    }, {"label": "保靖县", "value": "a9f01c522ac844c49d086ebafb7ce306"}, {
                        "label": "花垣县",
                        "value": "f27b0d4e350c4474b0c7c1ff26aae228"
                    }, {"label": "其他", "value": "90a568d0535742cba63f2d030df1951c"}],
                    "label": "湘西土家族苗族自治州",
                    "value": "8a0372774dfd47f3bcffb5da414415a2"
                }, {
                    "children": [{"label": "其他", "value": "b404b133ae8f420fa53d5bea761c7d3a"}],
                    "label": "其他",
                    "value": "a67bdd993804472582355372dbf4e043"
                }], "label": "湖南", "value": "5e4eb4ab8bcb40f19b1061d115c70312"
            }, {
                "children": [{
                    "children": [{
                        "label": "越秀区",
                        "value": "5d2fa83ac2ed467e851baebd52887559"
                    }, {"label": "荔湾区", "value": "441c01f4078540e594494dcf1c481ac1"}, {
                        "label": "海珠区",
                        "value": "daaf54229b094987a5ecc7e51e795563"
                    }, {"label": "天河区", "value": "049b75ab1977404785728aba3047388b"}, {
                        "label": "白云区",
                        "value": "5352b127717e49c089bcceb4fd26f7ef"
                    }, {"label": "黄埔区", "value": "3a6eb34f643c48b6aecfee67e48de34d"}, {
                        "label": "番禺区",
                        "value": "05cd9cf2552a42c38d32c26c9d92f386"
                    }, {"label": "花都区", "value": "253f78af478449b5b04767efb18b6f8f"}, {
                        "label": "南沙区",
                        "value": "a1bcbea7aaac463b946e2f07f5889f5a"
                    }, {"label": "萝岗区", "value": "3d386b4430bd44d1856c02f492126711"}, {
                        "label": "增城市",
                        "value": "45ce78e391764ef8988daf800d4175e9"
                    }, {"label": "从化市", "value": "5324ae5ca320458abcf436808097c9b1"}, {
                        "label": "其他",
                        "value": "2fa2526758f14a9bb107e958c3478976"
                    }], "label": "广州", "value": "e47c3886de084a67898b2680d68e05c1"
                }, {
                    "children": [{"label": "福田区", "value": "ec36d8bfde8449419b4360ccdb3e520c"}, {
                        "label": "罗湖区",
                        "value": "0ce03f4d2cec478d8705c70303c1d8dd"
                    }, {"label": "南山区", "value": "26b816cfde064b03ba7355ad8f6f7055"}, {
                        "label": "宝安区",
                        "value": "18144ebc97c84fb0a78470b846068649"
                    }, {"label": "龙岗区", "value": "d4191790a00445b3b153bb8b151f5eee"}, {
                        "label": "盐田区",
                        "value": "65bf82d73e584ab986c564cecaf04d41"
                    }, {"label": "其他", "value": "7060b87c067a48e0bbca65a5aeda216a"}],
                    "label": "深圳",
                    "value": "f49b3b390fa8473fb5bf417540b84d4c"
                }, {
                    "children": [{"label": "莞城", "value": "5c2e3cd7acbb4d64b5e306311d185365"}, {
                        "label": "常平",
                        "value": "7d47e5b4e38341239a5ba2ecf04cd65d"
                    }, {"label": "塘厦", "value": "5b294555470046a3b41ae5f10f8aa3dd"}, {
                        "label": "塘厦",
                        "value": "8c547a514e7647f19df921a57efeea8b"
                    }, {"label": "塘厦", "value": "c9cda399c2de44b4a5d7df2189a60de9"}, {
                        "label": "其他",
                        "value": "32e255ea1c5944dbab561d44650c636c"
                    }], "label": "东莞", "value": "7c90f0786ba44b59bd384485246bec93"
                }, {
                    "children": [{"label": "中山", "value": "47b876df1ad5420d99bbe0d10452f89a"}],
                    "label": "中山",
                    "value": "bb4b9cd2f337484d819584fc66f183fd"
                }, {
                    "children": [{"label": "湘桥区", "value": "319a178ad2cf4905888e18a89f491fdf"}, {
                        "label": "潮安县",
                        "value": "174d0754c5fc4ed59695757e4d1be3d7"
                    }, {"label": "饶平县", "value": "b5794981e5734458a21c241bffc3e33e"}, {
                        "label": "其他",
                        "value": "7bbb6480e07045f29a73c39531f7ccdf"
                    }], "label": "潮州", "value": "411b57bc7a5643cbb0036441e4769245"
                }, {
                    "children": [{"label": "榕城区", "value": "5ef1aa9ef96b456ea4272f5c5ff29503"}, {
                        "label": "揭东县",
                        "value": "da9ebc9788f74ebd82634ea5f6ffb60a"
                    }, {"label": "揭西县", "value": "c09a3d91583b4c649cc61e76ab86143f"}, {
                        "label": "惠来县",
                        "value": "058e4467b3a34f0a9bc01e2d395aa70f"
                    }, {"label": "普宁市", "value": "6d784b12566b413b871ec32f29919ee6"}, {
                        "label": "其他",
                        "value": "9a93e8a81ed442168c5d7f45e1c6ea4a"
                    }], "label": "揭阳", "value": "e2faaa358bb14f50941c0e35bbb082ba"
                }, {
                    "children": [{"label": "云城区", "value": "7a59a2431599423cb5843aaf5a55b35e"}, {
                        "label": "新兴县",
                        "value": "0cc8e283b33a425a806bd555af858b2a"
                    }, {"label": "郁南县", "value": "31f22a69b3d64f1293108bb92f5088d2"}, {
                        "label": "云安县",
                        "value": "4d6042a0e8e54720b1b5dbe5bf7688b8"
                    }, {"label": "罗定市", "value": "8ee9c57d2c8e4ae2a5b05c4381f03e66"}, {
                        "label": "其他",
                        "value": "f1ca43cdecc844a6ae71380ccf8ef905"
                    }], "label": "云浮", "value": "aeff3bfb859d4458883455b971ad2740"
                }, {
                    "children": [{"label": "香洲区", "value": "a9f9f2d077984f9190cc0ed1050d10db"}, {
                        "label": "斗门区",
                        "value": "98ab76351b7b49e2bda2c6ada6d4fbc4"
                    }, {"label": "金湾区", "value": "f885943b8a914956b094336730eba399"}, {
                        "label": "其他",
                        "value": "ab7937da45a94a599d7d494cd9355336"
                    }], "label": "珠海", "value": "470e773e68f84b959fe570f959840ebc"
                }, {
                    "children": [{"label": "金平区", "value": "9fc72768c82a42b3bb65101dd0d8f2a0"}, {
                        "label": "濠江区",
                        "value": "4f87d8598cc34782a4e90dca5ba57155"
                    }, {"label": "龙湖区", "value": "2aad91bd84464194bf60583b4387e2b4"}, {
                        "label": "潮阳区",
                        "value": "94575845b54b4055b09d4e2bfbe424f0"
                    }, {"label": "潮南区", "value": "8a232b0e00fd4c45b0504a3f870e17c9"}, {
                        "label": "澄海区",
                        "value": "3ea1abd48c3d4d2a861c6ae633ba770c"
                    }, {"label": "南澳县", "value": "984ba185274b4001bf3289af2fbaf8ac"}, {
                        "label": "其他",
                        "value": "97f9fca4a95540bab74381280f31e391"
                    }], "label": "汕头", "value": "c8dc9ca992d64d939a2b517e8de75687"
                }, {
                    "children": [{"label": "浈江区", "value": "a867b40a64dc4b09934a9608456aa3b2"}, {
                        "label": "武江区",
                        "value": "a0be586e40a040fcac1427fa74c30032"
                    }, {"label": "曲江区", "value": "33a3a83793b3403f9d6d69abf31b2df1"}, {
                        "label": "乐昌市",
                        "value": "77f87241e98a4cc7968dcf6fec181764"
                    }, {"label": "南雄市", "value": "fddf859cb71e483f91d7e3b31323a6ac"}, {
                        "label": "始兴县",
                        "value": "3061868a198c4763bc7513e4cd2d1ce9"
                    }, {"label": "仁化县", "value": "992e5f3cd55a4d7da395a8fa8b00e7ed"}, {
                        "label": "翁源县",
                        "value": "a1996d4f21164b5694ee095dc4ad51c3"
                    }, {"label": "新丰县", "value": "ee557273d0f640b39ce82c910e40ff68"}, {
                        "label": "乳源瑶族自治县",
                        "value": "ede0b36d9074404bb7a77cfb5c4f7497"
                    }, {"label": "其他", "value": "f8310ddc40d140908768ea6f97bdd956"}],
                    "label": "韶关",
                    "value": "ef4171d6ba3e477093fb570c74529f8c"
                }, {
                    "children": [{"label": "禅城区", "value": "d2fbb4a6e1354dc6bc7a0cd7dcd69bc4"}, {
                        "label": "南海区",
                        "value": "0b749eac0b52445ea7b1e5900baca752"
                    }, {"label": "顺德区", "value": "f5849bad0d6e4e5d90716cf4ad314b6e"}, {
                        "label": "三水区",
                        "value": "f4383330f47e494cba4236ed0e416ba3"
                    }, {"label": "高明区", "value": "a7e33be6b4994722bf93dfcbb4367bdd"}, {
                        "label": "其他",
                        "value": "fa395da0c850478984d336f66a9d29c9"
                    }], "label": "佛山", "value": "b883f850917341ffaecba0973dff4b33"
                }, {
                    "children": [{"label": "蓬江区", "value": "038b078d4d1b48be8f242802492e714d"}, {
                        "label": "江海区",
                        "value": "f03cadb4f18c42e4abedd9a81127c2b1"
                    }, {"label": "新会区", "value": "a7f3fffaabcc4d83a94538c5d9f7632b"}, {
                        "label": "恩平市",
                        "value": "587123c989eb425cacfcb0784494b443"
                    }, {"label": "台山市", "value": "7f78d41d9c0044da977dbe7f3fe1bbf2"}, {
                        "label": "开平市",
                        "value": "57366f10e3cc4802b8e84eda07f33448"
                    }, {"label": "鹤山市", "value": "454b02948abd42609afbf78c09c82181"}, {
                        "label": "其他",
                        "value": "bdda8a8dea6548deb6a38451fbd25c1f"
                    }], "label": "江门", "value": "0b4f64867ea047ae877da36c572f5072"
                }, {
                    "children": [{"label": "赤坎区", "value": "b1bcddf3401744e88b54cce23819087a"}, {
                        "label": "霞山区",
                        "value": "437634fe144b4d9cb5760f114ccfd653"
                    }, {"label": "坡头区", "value": "a560318a3f2143abac5a8f0e0289dffd"}, {
                        "label": "麻章区",
                        "value": "0394990e848b40cf8892ab4d198d59d7"
                    }, {"label": "吴川市", "value": "bf6ab04213844c45a5d085f2d50e2da9"}, {
                        "label": "廉江市",
                        "value": "e5e63c44f148487b81683ac6f4074aec"
                    }, {"label": "雷州市", "value": "674bc34835a0415e938db7da95a4c35d"}, {
                        "label": "遂溪县",
                        "value": "a1266a78ada449069776771c5d160310"
                    }, {"label": "徐闻县", "value": "8ceca10bcee74bdf94b28aeaa03f952a"}, {
                        "label": "其他",
                        "value": "45314356aa2c4e07b67c9fe1f1cd0349"
                    }], "label": "湛江", "value": "8d7eae3355de4ba0b22bb7c454744c45"
                }, {
                    "children": [{"label": "茂南区", "value": "f22b19b30097493f8a91987a82f2279c"}, {
                        "label": "茂港区",
                        "value": "4c15e075389a4e3782f4bcdd411856e4"
                    }, {"label": "化州市", "value": "be5e2fac0e514ebea1d29c209d481323"}, {
                        "label": "信宜市",
                        "value": "8ce3bd0563de4d33bd862af8b3a4444e"
                    }, {"label": "高州市", "value": "2f8e00f8e0b64099b9e25b1822ec98d9"}, {
                        "label": "电白县",
                        "value": "d929e2c4d3704a64b7f1d8d98a71691b"
                    }, {"label": "其他", "value": "59044c79605343c4beeb792540140c46"}],
                    "label": "茂名",
                    "value": "d4bd36d6c55e4ddabae241fba3458dd6"
                }, {
                    "children": [{"label": "端州区", "value": "dff669561db641b0b1fde09681b3cd00"}, {
                        "label": "鼎湖区",
                        "value": "c099b1c135094c07afe1e833464289bf"
                    }, {"label": "高要市", "value": "9d3077cf56dd43639cfeb73a398e9e8c"}, {
                        "label": "四会市",
                        "value": "fa10af1afbe24aa7a07bb9972101edee"
                    }, {"label": "广宁县", "value": "7e5966e895d64f62a228f8dbbb282ee5"}, {
                        "label": "怀集县",
                        "value": "ab66b12a678b43e5acc6747c753831a6"
                    }, {"label": "封开县", "value": "c7eb1cff8b79485d98a84ac79ee634b8"}, {
                        "label": "德庆县",
                        "value": "bba761799fa74f82aa1cf2f255b03f2c"
                    }, {"label": "其他", "value": "a0c566a4311342c38917e55ef27be9ca"}],
                    "label": "肇庆",
                    "value": "e5e80dcb7e814266a890624c3558a047"
                }, {
                    "children": [{"label": "惠城区", "value": "f0927eb4459642a88ef93a2b07653410"}, {
                        "label": "惠阳区",
                        "value": "83127821fa8545a4af0334c617e34e60"
                    }, {"label": "博罗县", "value": "6f05a83e007f4a0ab98203be37c7f260"}, {
                        "label": "惠东县",
                        "value": "e1521b3639ac4e9b87f3c5287631f61e"
                    }, {"label": "龙门县", "value": "0ad80d96619e4c3aa6ee9f1108ebc1a5"}, {
                        "label": "其他",
                        "value": "866cbe80bb444a0f86d90736e42572af"
                    }], "label": "惠州", "value": "1485b459d382463080927a27d5d3aa98"
                }, {
                    "children": [{"label": "梅江区", "value": "09c19e7b303d4a5f8bfcef58ebbe9deb"}, {
                        "label": "兴宁市",
                        "value": "001ca8f8ba474600b32d4787d43701b5"
                    }, {"label": "梅县", "value": "aa17f3606e994a25b66802a5729ecaf5"}, {
                        "label": "大埔县",
                        "value": "92e72a314f884507835d374a911cbdaf"
                    }, {"label": "丰顺县", "value": "cfda93b33cdb440e851705254305e519"}, {
                        "label": "五华县",
                        "value": "6fe551ce27c443599e90aa2c953e9aad"
                    }, {"label": "平远县", "value": "19c6690ffeca420b8fa34fd05cf58fdb"}, {
                        "label": "蕉岭县",
                        "value": "822fd075d26e4fc2a674a66764c1acb9"
                    }, {"label": "其他", "value": "3d08b8e80ca048f9971d63282641b5cd"}],
                    "label": "梅州",
                    "value": "1dc86365e3fa4f3c99b854b051bfa82a"
                }, {
                    "children": [{"label": "城区", "value": "e7ab9b5a38994a3181fba26e6a01c271"}, {
                        "label": "陆丰市",
                        "value": "12fdeaeb6c6142dcb98c89c3a348e62a"
                    }, {"label": "海丰县", "value": "9ed7b1ade336498f8535351721f91ed6"}, {
                        "label": "陆河县",
                        "value": "a875d43f1839432392793090206b49a7"
                    }, {"label": "其他", "value": "a52bef9a02b6419e8248969a5192d45c"}],
                    "label": "汕尾",
                    "value": "4c1630c017ee44fc98ec1a7bbe7fe23b"
                }, {
                    "children": [{"label": "源城区", "value": "93222df21a51416bb211c1fc7f3db79b"}, {
                        "label": "紫金县",
                        "value": "22e8b8e9a4804fd4a2bb5194ed5aa59d"
                    }, {"label": "龙川县", "value": "dced8c4fcf3a49eaa8e5fdfd29b86232"}, {
                        "label": "连平县",
                        "value": "aa0463e79e5142e9a202ae493a7ebe10"
                    }, {"label": "和平县", "value": "426a9a5691144dccb6b9a1bc0dedef60"}, {
                        "label": "东源县",
                        "value": "6dad57ab9bcc4443ae44d447bb233257"
                    }, {"label": "其他", "value": "ac8a170a1c26410c9c5f5b63eb87cb0a"}],
                    "label": "河源",
                    "value": "badb3a903b2747f49f27353b58ac67e1"
                }, {
                    "children": [{"label": "江城区", "value": "71044a54f65a492ba1686bda006ad044"}, {
                        "label": "阳春市",
                        "value": "fa271abd5d14436e8a256e1e17f1adb8"
                    }, {"label": "阳西县", "value": "93aecd251e2e4ab3a8e286acc221b2fa"}, {
                        "label": "阳东县",
                        "value": "5212fdeaba664b63a65e54d6f5517fd0"
                    }, {"label": "其他", "value": "df77ab116e3049ab9aa0340b42786a64"}],
                    "label": "阳江",
                    "value": "4282350a3d4948de86a37dc290ea0458"
                }, {
                    "children": [{"label": "清城区", "value": "f52cd593c3914a768c2fd8de4e2701dc"}, {
                        "label": "英德市",
                        "value": "472e93b1b7294769ad6cdf3b004d88b4"
                    }, {"label": "连州市", "value": "f3b7146c74f34fed845afa967e14b57a"}, {
                        "label": "佛冈县",
                        "value": "a095f4f481b24faa9b328e413abdf38a"
                    }, {"label": "阳山县", "value": "468c92a2858b43e0a5760bc03573a5ee"}, {
                        "label": "清新县",
                        "value": "15b68b7e737741cbac24fd9ea19e9fc8"
                    }, {"label": "连山壮族瑶族自治县", "value": "f89fb1b16b9a4694b89acc2dacd956bb"}, {
                        "label": "连南瑶族自治县",
                        "value": "0596de537c804e579cd7a86ec07171ce"
                    }, {"label": "其他", "value": "21d36b78c5504c9786ac0a9b7ef6ac36"}],
                    "label": "清远",
                    "value": "f28308d2b8b04b3ea3e43e3630cd5029"
                }], "label": "广东", "value": "d06369dcfedb42bc8484dc5ec4428682"
            }, {
                "children": [{
                    "children": [{
                        "label": "青秀区",
                        "value": "049dd5aa85164abdbd6b00aa3b4af1e3"
                    }, {"label": "兴宁区", "value": "daa7ac1b69264d9e89538b49a252007d"}, {
                        "label": "西乡塘区",
                        "value": "fdf58d701ef848bd8479bb898ef91ec8"
                    }, {"label": "良庆区", "value": "996d84b166c04f36b67fd542ea3dd2a6"}, {
                        "label": "江南区",
                        "value": "47432d933ba847d79e704f7caf6dd093"
                    }, {"label": "邕宁区", "value": "8d76dac8982e413088ceacbd119bbaf6"}, {
                        "label": "武鸣县",
                        "value": "b51dcdcc65db4364833620fceb3da0bf"
                    }, {"label": "隆安县", "value": "4d6646513b32470aa108ee667645b0e4"}, {
                        "label": "马山县",
                        "value": "84f80419a18b40b88e5ea70a3c0eedd5"
                    }, {"label": "上林县", "value": "f7f4c0d65e154368bbe169401dc653ab"}, {
                        "label": "宾阳县",
                        "value": "a0a824ebb2f544b484e0d80395994a01"
                    }, {"label": "横县", "value": "a01415301a18458ea3ca7f8ea6b0898b"}, {
                        "label": "其他",
                        "value": "63d8b7900c544479adb0950cbd55f189"
                    }], "label": "南宁", "value": "2cbaa7b5a1804dbe8483c8a7a68a1a90"
                }, {
                    "children": [{"label": "城中区", "value": "dde8681a02f247e29c5b3daec8b11603"}, {
                        "label": "鱼峰区",
                        "value": "3994ce405d374c2ba23024412782a7be"
                    }, {"label": "柳北区", "value": "41ecc61441c64b43a97962bafafec3f7"}, {
                        "label": "柳南区",
                        "value": "3862e72ea1be4e8f9bc34629a1d52443"
                    }, {"label": "柳江县", "value": "693afab6af6d4823a2eabd8cde04e90c"}, {
                        "label": "柳城县",
                        "value": "f4f44e2bed6a49c69c834e3e27c85746"
                    }, {"label": "鹿寨县", "value": "159a0f6e081a4243af510c6b1a479b8b"}, {
                        "label": "融安县",
                        "value": "108a807ef95947798ed88ca81a623ccd"
                    }, {"label": "融水苗族自治县", "value": "3838e9b8f0794205942b08805da7cdbf"}, {
                        "label": "三江侗族自治县",
                        "value": "b81528eb02ce48a0b8c5c64be43f53f4"
                    }, {"label": "其他", "value": "637a8e9cf3a9453ea8f544a61ce5901b"}],
                    "label": "柳州",
                    "value": "4637f1aabde64b8cb296d359deb6b72f"
                }, {
                    "children": [{"label": "象山区", "value": "6d51fad9e6ba4444859b07fea2c2d0d8"}, {
                        "label": "秀峰区",
                        "value": "dcb4a46da16f4fd5a63088d8f087229c"
                    }, {"label": "叠彩区", "value": "43eaee1230644fb6a3fb70b6180c481d"}, {
                        "label": "七星区",
                        "value": "979f34db3d2e49848f90325b9f6458d6"
                    }, {"label": "雁山区", "value": "8799b9214502456b9fb2fd7fc11716c1"}, {
                        "label": "阳朔县",
                        "value": "ccd9894815d046589d7b751d1a8a6580"
                    }, {"label": "临桂县", "value": "a413d2ebfedd451c8e0d0ce72d19496b"}, {
                        "label": "灵川县",
                        "value": "33f3573c2d8d4786ad9e990b62dc14ed"
                    }, {"label": "全州县", "value": "7beb812c567840e288476b885dba8070"}, {
                        "label": "平乐县",
                        "value": "00522def6b37485ba3ebcc82342ad51a"
                    }, {"label": "兴安县", "value": "22443225ef4f4716aa296ae45c1cae2f"}, {
                        "label": "灌阳县",
                        "value": "903b311345894c16ad2a803051cee6a5"
                    }, {"label": "荔浦县", "value": "0a3598f27b1b4f7795ceee0376662a6f"}, {
                        "label": "资源县",
                        "value": "2556d6e2d48b450aaae4db0cb6ffa53e"
                    }, {"label": "永福县", "value": "35ff7aefa4c348caaeeb0f1e7ba85be4"}, {
                        "label": "龙胜各族自治县",
                        "value": "6500767c867046659bc6fb1165ad9a5e"
                    }, {"label": "恭城瑶族自治县", "value": "55c22705121945f7a3f19877dd9ed8a5"}, {
                        "label": "其他",
                        "value": "5192181f2abc4876bc8d03ee0dabddff"
                    }], "label": "桂林", "value": "59e167838cef4ba58511b0f6f3ca2c69"
                }, {
                    "children": [{"label": "万秀区", "value": "51cea5b345d541a1b8f6118c00c6bc19"}, {
                        "label": "蝶山区",
                        "value": "6eef0400219b4a2fa17ea4b5063b2ca1"
                    }, {"label": "长洲区", "value": "e31e2c5bca9b48eebd4a57f4425fe39e"}, {
                        "label": "岑溪市",
                        "value": "7f117bbed5d94c14bdf83843cbd6a8a7"
                    }, {"label": "苍梧县", "value": "d1e0d317088746f8a9cc36bcb68b618b"}, {
                        "label": "藤县",
                        "value": "8a8133e72ced4e8f81ea1b6a676c7536"
                    }, {"label": "蒙山县", "value": "b14b84b70bc5443789f13d3892edc551"}, {
                        "label": "其他",
                        "value": "948222e2f1af4097a27091785e45e5a6"
                    }], "label": "梧州", "value": "7e36d2f78be34354b9d4d5440dbe8c3f"
                }, {
                    "children": [{"label": "海城区", "value": "5d419365d8a94f29aedda99f4b240faa"}, {
                        "label": "银海区",
                        "value": "8eb7d6015031427ba72bfe7bcebaaf65"
                    }, {"label": "铁山港区", "value": "4a60c729181e444f94b1eefeef1c8b00"}, {
                        "label": "合浦县",
                        "value": "7bed768d48544778a46ebdd8f05b9d3e"
                    }, {"label": "其他", "value": "c0de033ce293469fa6fa4e60834eb428"}],
                    "label": "北海",
                    "value": "4aa8819fd7154abfac8c74a907cedabd"
                }, {
                    "children": [{"label": "港口区", "value": "c913abbc656f438797d8545f33dd7597"}, {
                        "label": "防城区",
                        "value": "1dd48a02f749489db1d22e4816cc8d5f"
                    }, {"label": "东兴市", "value": "2777cc55365e41d68390fa38dea63c96"}, {
                        "label": "上思县",
                        "value": "1956baa3f18f456381492cdda081e33a"
                    }, {"label": "其他", "value": "fff2c8f7520e4008b04eee71a1a70f75"}],
                    "label": "防城港",
                    "value": "635d981373474eec90a2ade774dcd6bf"
                }, {
                    "children": [{"label": "钦南区", "value": "8e6fcfd84d8d4afe90314871628744db"}, {
                        "label": "钦北区",
                        "value": "64c28d412fcf47f18ff964c452dacebf"
                    }, {"label": "灵山县", "value": "a66e2f12eec940fcb1dc9c3a0b72b87a"}, {
                        "label": "浦北县",
                        "value": "21cf0c9c3f0349c2af3b1b55b584b23d"
                    }, {"label": "其他", "value": "cd96dd7475a94d61b4f4329b70103adc"}],
                    "label": "钦州",
                    "value": "1f296195abf14dfe9a99f303bbb784bb"
                }, {
                    "children": [{"label": "港北区", "value": "30b21d64d60649feaf293ac58fa802d1"}, {
                        "label": "港南区",
                        "value": "fb6daec908ec4f94ae70d2b015ab0c5f"
                    }, {"label": "覃塘区", "value": "9f28309d591d43d78a2bc36d63f8956b"}, {
                        "label": "桂平市",
                        "value": "2dab76fc3cc34a7e8fbd7303cdff6b8e"
                    }, {"label": "平南县", "value": "522e85fddf194d4389cdd39b4ef3f349"}, {
                        "label": "其他",
                        "value": "223e60946357425a8715da6f8a874e4d"
                    }], "label": "贵港", "value": "75e77e7f9cc04d618b21e524f90a25a0"
                }, {
                    "children": [{"label": "玉州区", "value": "705751d74a5e48ce993eb204bb55801c"}, {
                        "label": "北流市",
                        "value": "11b3199ff5104863be159ac1abde4fe4"
                    }, {"label": "容县", "value": "5bc6d7ea0337409787768bff2fc36684"}, {
                        "label": "陆川县",
                        "value": "dfb8e51f42ca4e8bb8fc473bfe55d2da"
                    }, {"label": "博白县", "value": "941bade69efe4781b4bc5da67e6e496a"}, {
                        "label": "兴业县",
                        "value": "9e836519e5e94f5e83e77ad870e96b42"
                    }, {"label": "其他", "value": "58beda8600194138870f1cc6cb7526c7"}],
                    "label": "玉林",
                    "value": "11e81f545b0d483995a878b63d85914c"
                }, {
                    "children": [{"label": "右江区", "value": "ba926356b33941f5952d51ea4cf9b35e"}, {
                        "label": "凌云县",
                        "value": "4e4cf28305d544c190ddc485654ded60"
                    }, {"label": "平果县", "value": "c2f42ef5490641aba469f5e96cd3d374"}, {
                        "label": "西林县",
                        "value": "bf7716437cfe45fb9ef8760618c77619"
                    }, {"label": "乐业县", "value": "ed52477c7f954c66bfe21bec8cf0f7c2"}, {
                        "label": "德保县",
                        "value": "dd9906520287477d84e821cc6eab2d22"
                    }, {"label": "田林县", "value": "02d893cd5a024c0db59da4e9db6d7dab"}, {
                        "label": "田阳县",
                        "value": "9df7084bb87c4f7a95801a923138628b"
                    }, {"label": "靖西县", "value": "62bd2ee82bd84752b666b5aa88ce278b"}, {
                        "label": "田东县",
                        "value": "ce6506d5c3e44f499d484fc92ab771f1"
                    }, {"label": "那坡县", "value": "b4cb78534a874e35b4512961fdbcbbab"}, {
                        "label": "隆林各族自治县",
                        "value": "93aa25093d724993a57a5150f6880bf1"
                    }, {"label": "其他", "value": "5af85942295d4345aa324d09c44bb8cb"}],
                    "label": "百色",
                    "value": "d3371b8d01af4e6a9337c1f40a343c1e"
                }, {
                    "children": [{"label": "八步区", "value": "8c36be40d9ed4879826d5afd0fb6645b"}, {
                        "label": "钟山县",
                        "value": "f110442b4dbe48ab8ed5da100a20af8f"
                    }, {"label": "昭平县", "value": "4bf7665fad7c4994b7de002d3a3f8ca0"}, {
                        "label": "富川瑶族自治县",
                        "value": "44f86d6b7cc845b0b5625e0105d60446"
                    }, {"label": "其他", "value": "23c90a1406084d3e953ff0baf13b016b"}],
                    "label": "贺州",
                    "value": "49de0599cc134fd48fc9260d2f4b313c"
                }, {
                    "children": [{"label": "金城江区", "value": "33fcffb084764acf8a171c60f047de31"}, {
                        "label": "宜州市",
                        "value": "2b4760666c594576a2e0613a77dda4e2"
                    }, {"label": "天峨县", "value": "c694bdbc28654b94a96ec1c38a0393d7"}, {
                        "label": "凤山县",
                        "value": "2a20ddae1db0414dbac42866f5486576"
                    }, {"label": "南丹县", "value": "f1201d7794a64b578e63a5982eba2bb3"}, {
                        "label": "东兰县",
                        "value": "6f3395ef8e63426daad2208e8becc246"
                    }, {"label": "都安瑶族自治县", "value": "d205b2b090ab428aae93bb84d7bb0e15"}, {
                        "label": "罗城仫佬族自治县",
                        "value": "572ed86d56554b39b7536bf596db0b1e"
                    }, {"label": "巴马瑶族自治县", "value": "02c05f906b0e42ec936a2b5f5dc4403f"}, {
                        "label": "环江毛南族自治县",
                        "value": "4e133c1887634771bd88a0b65ba350b7"
                    }, {"label": "大化瑶族自治县", "value": "3e8cb67374d04fa1bc4b8e31ab1a0197"}, {
                        "label": "其他",
                        "value": "3da8c81c4f3b44108354f9cf76cd1da0"
                    }], "label": "河池", "value": "b21018bd691d43f58ce00f168aa7be4e"
                }, {
                    "children": [{"label": "兴宾区", "value": "74fb483c917a4915a1d55d0c52e9a423"}, {
                        "label": "合山市",
                        "value": "ca366404bddc40c6a36badee94b6888a"
                    }, {"label": "象州县", "value": "86432630c6464b1bb93b32ad26eab656"}, {
                        "label": "武宣县",
                        "value": "5a17db52d63942679ac6d4034ead9476"
                    }, {"label": "忻城县", "value": "f9562bd60ff7498997110fa571ce3c86"}, {
                        "label": "金秀瑶族自治县",
                        "value": "1000f0139a0b4030b3c75e2899bbdcc6"
                    }, {"label": "其他", "value": "6e47f494c3524beb940c0d587fb873ce"}],
                    "label": "来宾",
                    "value": "75b9fe6508ad4f8d8af6aea677e1d196"
                }, {
                    "children": [{"label": "江州区", "value": "4b6c32d9fd9b462eb2e1bb2bc30082f2"}, {
                        "label": "凭祥市",
                        "value": "3c17ff3703df44c9ae9f32402943ecbf"
                    }, {"label": "宁明县", "value": "a2d9caed55b84370a27e3742316e0faf"}, {
                        "label": "扶绥县",
                        "value": "61c2251b8bf843b9ae59d5fd05880ddb"
                    }, {"label": "龙州县", "value": "d077b937322d45a5bb7812eec9920fee"}, {
                        "label": "大新县",
                        "value": "c92436e18d9c4676b1267035f8a5a4cc"
                    }, {"label": "天等县", "value": "5af586301e1b4cff8f35b77d8dbdc332"}, {
                        "label": "其他",
                        "value": "9cdeeb41bd0b437097518c601b843a44"
                    }], "label": "崇左", "value": "0cefd5cf8637483f89d7191986a6e84f"
                }, {
                    "children": [{"label": "其他", "value": "dbbe75e5f51b4cffa5698229903b28a7"}],
                    "label": "其他",
                    "value": "af41ee7bd19f4288bedc64d0344310b3"
                }], "label": "广西", "value": "71bd8c486f744c099cdf4513955147d4"
            }, {
                "children": [{
                    "children": [{
                        "label": "龙华区",
                        "value": "f9682463800a41adbea0f1bd02af753d"
                    }, {"label": "秀英区", "value": "382f9914a3da4c3a914f8b781334420f"}, {
                        "label": "琼山区",
                        "value": "b88c1b3cbbff4cebab757ebc77fab68d"
                    }, {"label": "美兰区", "value": "83ec6747ae6e4ee181749a306264dc26"}, {
                        "label": "其他",
                        "value": "28f8b5872c9442089319349f7cd185af"
                    }], "label": "海口", "value": "e8a35ff293b1404ba7fc5717a2ee7520"
                }, {
                    "children": [{"label": "三亚市", "value": "01ab461ce35d4375b07ba4df9ad293bf"}, {
                        "label": "其他",
                        "value": "657961ce46cf4255bd1fc8b57e6e63ba"
                    }], "label": "三亚", "value": "9cc1476e68dd4878a6a8c857cef10ac6"
                }, {
                    "children": [{"label": "五指山", "value": "53b229cff0414645af31bc87625d33ef"}],
                    "label": "五指山",
                    "value": "fcf9a8fb895b4c7d94ee2799a036f60c"
                }, {
                    "children": [{"label": "琼海", "value": "110a0707fea14f3a8c8d481133e04c96"}],
                    "label": "琼海",
                    "value": "65d88a2cad4340e1baebcf7dd2ffa168"
                }, {
                    "children": [{"label": "儋州", "value": "eba2bbf71d884a75853b70cdc945cbde"}],
                    "label": "儋州",
                    "value": "93bd79f81cb24fe592269dabf011da90"
                }, {
                    "children": [{"label": "文昌", "value": "9e1df8ee01854f4b9d268e1550c403e1"}],
                    "label": "文昌",
                    "value": "91b15de253aa44c6a60b552a70b24397"
                }, {
                    "children": [{"label": "万宁", "value": "4c886b79ce4247e59fd0f64a87d99cb9"}],
                    "label": "万宁",
                    "value": "914c0a97c19a47a5ac9c523445a1316f"
                }, {
                    "children": [{"label": "东方", "value": "7ebcefbf19854190a267c4d00278e0fa"}],
                    "label": "东方",
                    "value": "b1ab7e4cf2d44301939e0c1b76a133e0"
                }, {
                    "children": [{"label": "澄迈县", "value": "69e908029f0c461e880ab88bf21c0370"}],
                    "label": "澄迈县",
                    "value": "eb4998532635487fadedd23876130ad0"
                }, {
                    "children": [{"label": "定安县", "value": "3667199b815c4e8695fb69394ebd1214"}],
                    "label": "定安县",
                    "value": "676dd115e26c4f33a2ba4ab35098193b"
                }, {
                    "children": [{"label": "屯昌县", "value": "bc8e45a4f791446d945cd79e1c20bbeb"}],
                    "label": "屯昌县",
                    "value": "a91cf62103eb4f27abd9274e471e6103"
                }, {
                    "children": [{"label": "临高县", "value": "02f0f12ab08b463687751743b24618c0"}],
                    "label": "临高县",
                    "value": "0d27b71440094a878af3db978c06e057"
                }, {
                    "children": [{"label": "白沙黎族自治县", "value": "997df9ed7ce04ba6b6ed4e2cf0d13879"}],
                    "label": "白沙黎族自治县",
                    "value": "663ca30bea734e7b9d7ed7fc1df920f3"
                }, {
                    "children": [{"label": "昌江黎族自治县", "value": "be8dc9af2eb746aca57aa95a76a42b10"}],
                    "label": "昌江黎族自治县",
                    "value": "50d0c571751b4bd8a35ff4498ec9e6d7"
                }, {
                    "children": [{"label": "乐东黎族自治县", "value": "811384f12a5b464c82971af1f9be1939"}],
                    "label": "乐东黎族自治县",
                    "value": "281b3adb780b49c19dcd16a8e8f52e17"
                }, {
                    "children": [{"label": "陵水黎族自治县", "value": "1094c283749d4e98a2fc57dcafc83a02"}],
                    "label": "陵水黎族自治县",
                    "value": "0a2131356852458f80221b80e9c66515"
                }, {
                    "children": [{"label": "保亭黎族苗族自治县", "value": "b0c5c9e459e84c7b8a60b89e99d88999"}],
                    "label": "保亭黎族苗族自治县",
                    "value": "d4f4703c1a5444419c9f7ee7b92c7c37"
                }, {
                    "children": [{"label": "琼中黎族苗族自治县", "value": "c7fd4ac90176412fa49d1d76c3ec9f86"}],
                    "label": "琼中黎族苗族自治县",
                    "value": "b0bcc71f25e94c0bae3419a51f610804"
                }, {
                    "children": [{"label": "其他", "value": "58b820ae43a44b75b215f9ebd76cfdbb"}],
                    "label": "其他",
                    "value": "606cbc697b9e490dbc1858cbc1397d64"
                }], "label": "海南", "value": "e183457c75394f4eb97d9c8daa7b1668"
            }, {
                "children": [{
                    "children": [{
                        "label": "渝中区",
                        "value": "179bbefc116f49508336d7ea330fc35a"
                    }, {"label": "大渡口区", "value": "f62d9d9a400f4717a91ba5c2f067025a"}, {
                        "label": "江北区",
                        "value": "d4229e1bfce34f5798d3ad3414d619ba"
                    }, {"label": "南岸区", "value": "53d801031a9a4fb3a26969513e6c55d7"}, {
                        "label": "北碚区",
                        "value": "b0a7f3ebab7c4fc89892c080da71b0ff"
                    }, {"label": "渝北区", "value": "9cdc64837d984f7a9e81d99f6b7d5903"}, {
                        "label": "巴南区",
                        "value": "6f98bd7e5af24c36ade153b12e2f1a90"
                    }, {"label": "长寿区", "value": "d99ba6154b124232ba546d8693913c2b"}, {
                        "label": "双桥区",
                        "value": "f6a67e63f15b4582af1743268bb5d4e1"
                    }, {"label": "沙坪坝区", "value": "593891ce58ca4da99212dab7582551c9"}, {
                        "label": "万盛区",
                        "value": "a656d52b8bdf44d390fd96a017d83064"
                    }, {"label": "万州区", "value": "239934e6db0a40e69294ffa4ca69da0c"}, {
                        "label": "涪陵区",
                        "value": "a80a49ea14244f38970710c3aaa90ab6"
                    }, {"label": "黔江区", "value": "396975827ab64a55a635b5983a6c6d18"}, {
                        "label": "永川区",
                        "value": "a0e7120e95134321872f54c89d80dd19"
                    }, {"label": "合川区", "value": "e83a44fb451b469e8b46f6ed41fc05db"}, {
                        "label": "江津区",
                        "value": "dac349a40ebc459aac16bcb740565d1b"
                    }, {"label": "九龙坡区", "value": "7f70472f895547d4a295f499255209f2"}, {
                        "label": "南川区",
                        "value": "5fe925b7e5a54cf6a823b76620f15a46"
                    }, {"label": "綦江县", "value": "36abe3396aaa4aee8e2eb0d56034e218"}, {
                        "label": "潼南县",
                        "value": "dcfaa25570fc44cb8bf7521e5a71aa51"
                    }, {"label": "荣昌县", "value": "7fcc55771a6e4a6c82057e8fcdf0d1cf"}, {
                        "label": "璧山县",
                        "value": "1403806b3bbf425b8b53ca29efb3ce24"
                    }, {"label": "大足县", "value": "4204cbedf8904e11a48aba470701f5b9"}, {
                        "label": "铜梁县",
                        "value": "003a5b58fc984111b30588b5f264d8ca"
                    }, {"label": "梁平县", "value": "2c82c6a0dc37438096230c6be2a48ac3"}, {
                        "label": "开县",
                        "value": "e587fd8fbe5745a0b78d9fc4cb04aa36"
                    }, {"label": "忠县", "value": "1d5c92db35244efba082b831b6a4cbf9"}, {
                        "label": "城口县",
                        "value": "25f8fdb949014d69aa7be183671d43f0"
                    }, {"label": "垫江县", "value": "b3df544f002644f78857948d8120b995"}, {
                        "label": "武隆县",
                        "value": "5dfcf337a1634475b488ddf61b07acad"
                    }, {"label": "丰都县", "value": "64be556e40e34f1d8e1e2290cf9b8228"}, {
                        "label": "奉节县",
                        "value": "2102ff31c1db4d6ebec1d34a3d2d293b"
                    }, {"label": "云阳县", "value": "fe54aa4364704878aeed73864e3d3382"}, {
                        "label": "巫溪县",
                        "value": "41af7bb1899148519c4f0270a9661e36"
                    }, {"label": "巫山县", "value": "5bff6d4d50b84d7485097f59d68e032a"}, {
                        "label": "石柱土家族自治县",
                        "value": "7b8bc1aebb484d08a7413723c90da15f"
                    }, {"label": "秀山土家族苗族自治县", "value": "b58ee3e096b949e9a736c031e83abfe6"}, {
                        "label": "酉阳土家族苗族自治县",
                        "value": "66cc729813da4c239b427dcaedc9cdd5"
                    }, {"label": "彭水苗族土家族自治县", "value": "c036721af05a4b11b0f123fbce82eb1e"}, {
                        "label": "其他",
                        "value": "bbfe82f1ebc949bab53606ff674015f2"
                    }], "label": "重庆", "value": "69f652d0a4684a74a88ed1e9e0783d50"
                }], "label": "重庆", "value": "4b468dcd644243e8b4a9284699672599"
            }, {
                "children": [{
                    "children": [{
                        "label": "青羊区",
                        "value": "4302540e5e0c4fff80c8dda348c30eb3"
                    }, {"label": "锦江区", "value": "06e3b39608db4c9f9b9c05246fe1dbd2"}, {
                        "label": "金牛区",
                        "value": "37a7d14389df41cd8818ba8d8e565de2"
                    }, {"label": "武侯区", "value": "0d87447b8ab94b7d8ec494fc6c8778ba"}, {
                        "label": "成华区",
                        "value": "0ad719e6c9394abd96bdf60a1b27fef8"
                    }, {"label": "龙泉驿区", "value": "3c977478ddf240bdb22351932a25e047"}, {
                        "label": "青白江区",
                        "value": "8d4e758221084781a7d67ece84d53a01"
                    }, {"label": "新都区", "value": "c4d6335e88b94948aa0c642ef25da31f"}, {
                        "label": "温江区",
                        "value": "153f63e005ba43478e9981eef4059f46"
                    }, {"label": "都江堰市", "value": "cc9e3faebfc843d4b8c6e8a6ae6d6a45"}, {
                        "label": "彭州市",
                        "value": "db3e2dcb2cbf47729a74444c269af75e"
                    }, {"label": "邛崃市", "value": "d47be41a12c94331ba5ade3782b44ee7"}, {
                        "label": "崇州市",
                        "value": "ebdd3255f65f4008b51cd79bcb021a52"
                    }, {"label": "金堂县", "value": "f240275725c64df5843f425468dcc572"}, {
                        "label": "郫县",
                        "value": "999f5d82408c4983b64591ed79abe28b"
                    }, {"label": "新津县", "value": "6ef267273c4b4d31bc187ac9d936fa41"}, {
                        "label": "双流县",
                        "value": "7c5d203306bd4ce89db419c03b3a7af1"
                    }, {"label": "蒲江县", "value": "4cbbdc5bdcde455d8b531a668483caff"}, {
                        "label": "大邑县",
                        "value": "999750647b03479f98f576eb0fa2a7c2"
                    }, {"label": "其他", "value": "a60dbe4d56ef46d9ad2a9f966487a313"}],
                    "label": "成都",
                    "value": "d22f7b2ddc214ed899527f185defddff"
                }, {
                    "children": [{"label": "大安区", "value": "683173adc19f4de985d626cf947ba254"}, {
                        "label": "自流井区",
                        "value": "0d7b653a08f3423d91fb3b2c99e47470"
                    }, {"label": "贡井区", "value": "4c7e167f78fa46159c1a588c8695ac7c"}, {
                        "label": "沿滩区",
                        "value": "14803763ddc84303a98622bbf0a7a666"
                    }, {"label": "荣县", "value": "41eb98a776344d3ca87506f74dfa8793"}, {
                        "label": "富顺县",
                        "value": "b8eb3e2e828047e08af8a4b223166c42"
                    }, {"label": "其他", "value": "65699f90cdd14ea1b849d8deec30daec"}],
                    "label": "自贡",
                    "value": "67136e3b47244b06a21eb587769a51e1"
                }, {
                    "children": [{"label": "仁和区", "value": "18715bdf9f1442f9b5197a5378d18ef6"}, {
                        "label": "米易县",
                        "value": "a618c3cb3973436ca5db88ea9062ee3a"
                    }, {"label": "盐边县", "value": "541ee4102ce648f68aa973e1aad9b935"}, {
                        "label": "东区",
                        "value": "6c5cea9c81d3460a85a8abdd72ef6038"
                    }, {"label": "西区", "value": "8db517b3c66f49009a42c5758606d843"}, {
                        "label": "其他",
                        "value": "6c316df7219e48fca22f2690eaa6dbdf"
                    }], "label": "攀枝花", "value": "5e1d1fe832634e8fb522564676701f28"
                }, {
                    "children": [{"label": "江阳区", "value": "a2ba260454bb43dd9a57b2a95b210749"}, {
                        "label": "纳溪区",
                        "value": "1523f6395e434b8caf50872a4ff89ed4"
                    }, {"label": "龙马潭区", "value": "9ca7ee4b083d4af6ab38155138117903"}, {
                        "label": "泸县",
                        "value": "6fab6fe5b3cd4b0da8c2beacda208196"
                    }, {"label": "合江县", "value": "bbfd77a62841412085d2e5ca4f544949"}, {
                        "label": "叙永县",
                        "value": "870c395bfd34427586567a711dbb0812"
                    }, {"label": "古蔺县", "value": "dad530eb284a47cc9a2c6a5e5fb0f862"}, {
                        "label": "其他",
                        "value": "f70fc2f416374fa9b8fa83a1215ddd35"
                    }], "label": "泸州", "value": "c46c9cea3eb14ecd8959bb8df3e878aa"
                }, {
                    "children": [{"label": "旌阳区", "value": "10cb9548ab6e47b8b9ace27cbeb2eaf8"}, {
                        "label": "广汉市",
                        "value": "9838029bdbf149248cb9337f59d53dd3"
                    }, {"label": "什邡市", "value": "f172e9a6891643cf847272d3054b6c1d"}, {
                        "label": "绵竹市",
                        "value": "bb60c1a7af984a54b3efb4c9a0e48681"
                    }, {"label": "罗江县", "value": "d4b45fae919f4bdbba23950663eb069a"}, {
                        "label": "中江县",
                        "value": "13cd79a1fee344579b314880a862e452"
                    }, {"label": "其他", "value": "39093705908341458535ee98a5ba38df"}],
                    "label": "德阳",
                    "value": "99a845f42425426c85bc0c780cb09972"
                }, {
                    "children": [{"label": "涪城区", "value": "071fde9d7fdc4f29957776e67be1b0f1"}, {
                        "label": "游仙区",
                        "value": "5bdec73979b742c6bef6444db626dfd7"
                    }, {"label": "江油市", "value": "895a100d9d3c4d18a4a9e3fd0cf5e288"}, {
                        "label": "盐亭县",
                        "value": "b5aecfeed5d94d549286ef06d5198500"
                    }, {"label": "三台县", "value": "26aaeb04a53a408ca42f68b1eb25fb39"}, {
                        "label": "平武县",
                        "value": "7375a8259b4d43298861956b924cfa6c"
                    }, {"label": "安县", "value": "320aa629dc994cf9b6d6f261b0225b70"}, {
                        "label": "梓潼县",
                        "value": "de2992acdbec49638e125006e0fe5e56"
                    }, {"label": "北川羌族自治县", "value": "62a0d63260604bf68cb226740ed37e78"}, {
                        "label": "其他",
                        "value": "d13cf31e91a547e18eb2f60461a05abd"
                    }], "label": "绵阳", "value": "afdb3d1638d14fc998f92db95ee16f08"
                }, {
                    "children": [{"label": "元坝区", "value": "2aae662dd8684b528c777f430d026324"}, {
                        "label": "朝天区",
                        "value": "953a0a1ae59d4e97a02eae0850f51c17"
                    }, {"label": "青川县", "value": "53a93bf24c874510bc9e5ead7bcba506"}, {
                        "label": "旺苍县",
                        "value": "7d752b6a48a94c8290b58c3fbaaef1ec"
                    }, {"label": "剑阁县", "value": "a0a1120fe5004837845ed8428263a431"}, {
                        "label": "苍溪县",
                        "value": "53e6bbf0521346a7a023c085a1818a88"
                    }, {"label": "市中区", "value": "1f07b3e23674483e9dcdd48182b5d16a"}, {
                        "label": "其他",
                        "value": "5bcb3f087842496c8a3cf95950c0a7ec"
                    }], "label": "广元", "value": "f137dfbd38d042b683df1ebb8dbb1ede"
                }, {
                    "children": [{"label": "船山区", "value": "ba9b9f42ec1e4807b177c055c83cba09"}, {
                        "label": "安居区",
                        "value": "998c07a108404567bf3ecc542e0b990e"
                    }, {"label": "射洪县", "value": "d0bc2d38aad44c29ab27eb43e355b3cc"}, {
                        "label": "蓬溪县",
                        "value": "aa656e04a3734f9bbf64c5ab1bc744d8"
                    }, {"label": "大英县", "value": "3bdccc3632b84bd29ae6230062c0bd8f"}, {
                        "label": "其他",
                        "value": "460dc47a3b92469196c56c79de64a0aa"
                    }], "label": "遂宁", "value": "e9cd7820ab024fad83ce474b43d1dfb1"
                }, {
                    "children": [{"label": "市中区", "value": "b0bcb2c384c243ed98deaa8bfdaf3fb1"}, {
                        "label": "东兴区",
                        "value": "75e85cab74e84212befbbbea8dd63ec5"
                    }, {"label": "资中县", "value": "53ca83bf67184e5898025447a898c735"}, {
                        "label": "隆昌县",
                        "value": "a8b9c4d5d05e4841ae2d30b542fca6a7"
                    }, {"label": "威远县", "value": "3c59b4be30914918bd50e887896b3aee"}, {
                        "label": "其他",
                        "value": "b810c76dbbf74162925cd7e2080e0e8d"
                    }], "label": "内江", "value": "17ea7163b2e2417eb1c8178069e9364b"
                }, {
                    "children": [{"label": "市中区", "value": "4867fa6c2afa4d9aa536a95ae95731d9"}, {
                        "label": "五通桥区",
                        "value": "ecae1fa7b6024c8ab8706fd0a191a327"
                    }, {"label": "沙湾区", "value": "1a1e934c6b494ebcae2de8214bcf35b2"}, {
                        "label": "金口河区",
                        "value": "5c12ff59619640128df56c675ebb5ac3"
                    }, {"label": "峨眉山市", "value": "6a778da299ee42bc8d11564700b6cd49"}, {
                        "label": "夹江县",
                        "value": "733c4124414e465798c6089933d2026a"
                    }, {"label": "井研县", "value": "2ce2a71aece845b1815040d7eeeac64d"}, {
                        "label": "犍为县",
                        "value": "08f14793cd174cf6a8f031af1cc6d267"
                    }, {"label": "沐川县", "value": "deec7f11b7244c058e5af696c3afb6f5"}, {
                        "label": "马边彝族自治县",
                        "value": "7959ef3620194e679b7d6578f00086ab"
                    }, {"label": "峨边彝族自治县", "value": "6afea1f8da26400298b99662e632e463"}, {
                        "label": "其他",
                        "value": "1bf147f1e9c84fb8a1f852967fb29636"
                    }], "label": "乐山", "value": "469d35a237634fe6bb789c32405fd60b"
                }, {
                    "children": [{"label": "顺庆区", "value": "bcdcc5cf00c74d71931a2da0a47311cb"}, {
                        "label": "高坪区",
                        "value": "27be1e7409a14668b2911225196745cb"
                    }, {"label": "嘉陵区", "value": "92066c65042b4583a5d636c0eea62bc9"}, {
                        "label": "阆中市",
                        "value": "c0dcadcf53044c1da103170e5ca03ddb"
                    }, {"label": "营山县", "value": "0b07ce414b044e9788bb63d4d7e3c46d"}, {
                        "label": "蓬安县",
                        "value": "a15ededb17dd4443b8a7d49a16d5e655"
                    }, {"label": "仪陇县", "value": "9def3cff14954c5da14d3fbdec8eff54"}, {
                        "label": "南部县",
                        "value": "9a8782531347416684d25df877679688"
                    }, {"label": "西充县", "value": "a91f152f862c4612b5e83c7ad44370b1"}, {
                        "label": "其他",
                        "value": "67d3dd8084114d76b3401aad7b7cee81"
                    }], "label": "南充", "value": "8fdd336c51c3432291f36e0992280b91"
                }, {
                    "children": [{"label": "东坡区", "value": "9068845b90674f9a87544b395bf9800b"}, {
                        "label": "仁寿县",
                        "value": "a034437a54fa4926917fddf67ec5157b"
                    }, {"label": "彭山县", "value": "9d9aeb1027b7403ca0695e93904b3e4d"}, {
                        "label": "洪雅县",
                        "value": "50eb37a9680d4f69ac9f630cc147359f"
                    }, {"label": "丹棱县", "value": "75f55da05a7b4b28b59c7ad32bf4c10e"}, {
                        "label": "青神县",
                        "value": "a8b0be3164da44658eb4f90016019c59"
                    }, {"label": "其他", "value": "9a3c92d1e73e429db20ad52a94bf8ca6"}],
                    "label": "眉山",
                    "value": "d7e45642846340c8ae6564e3d9c6c479"
                }, {
                    "children": [{"label": "翠屏区", "value": "a534645fd10f466482ae153ad9269ddd"}, {
                        "label": "宜宾县",
                        "value": "25809086beed4b0db470d86bd39b7c71"
                    }, {"label": "兴文县", "value": "7efaa0e4550f49788a47ded2773cd709"}, {
                        "label": "南溪县",
                        "value": "5c79d8cdf0054c0dae219976b1402579"
                    }, {"label": "珙县", "value": "69943709f91f47eeac60227a9a2669e4"}, {
                        "label": "长宁县",
                        "value": "99cc62f776db4dafa4503b9068009434"
                    }, {"label": "高县", "value": "f84fe532207042d0a8281273a45d6df0"}, {
                        "label": "江安县",
                        "value": "15d861feb48f435ba6f0f23889ed7cc9"
                    }, {"label": "筠连县", "value": "a330502e4b5c44eda161655d32935e1a"}, {
                        "label": "屏山县",
                        "value": "777bc7670d2c4c99b398e4af03d31bc7"
                    }, {"label": "其他", "value": "936b1d79d4b5450e99fca404949e21ed"}],
                    "label": "宜宾",
                    "value": "20eba5223831438c9400cbac8a0d73d5"
                }, {
                    "children": [{"label": "广安区", "value": "a34f286d62a14a21b885df173925966b"}, {
                        "label": "华蓥市",
                        "value": "a0cde67bae0345c0802f32e3a0128afd"
                    }, {"label": "岳池县", "value": "5f95cd7fb58040f3bfcc13fee4e24c13"}, {
                        "label": "邻水县",
                        "value": "4e378b99e692421097531ff9bb970802"
                    }, {"label": "武胜县", "value": "45adf0034e5249de9a1c53fecece7f2e"}, {
                        "label": "其他",
                        "value": "a27460047a644e51be3ea0dc8a7d7111"
                    }], "label": "广安", "value": "7833b567fa144a3b978251b7bffa0933"
                }, {
                    "children": [{"label": "通川区", "value": "a4eaa00e5d3045c58b055e1c688a028c"}, {
                        "label": "万源市",
                        "value": "af7d80f671b442c69a65ffb6aead7708"
                    }, {"label": "达县", "value": "7f1f0cff6a30490b988ce9e315bfbc69"}, {
                        "label": "渠县",
                        "value": "5c1227f08a22422eb6582feb902bf88c"
                    }, {"label": "宣汉县", "value": "27af5547d6464caf97307c6a295ead08"}, {
                        "label": "开江县",
                        "value": "33c1e5c576bf4297b54157ae0a05454e"
                    }, {"label": "大竹县", "value": "5c1ba6492ff94da9a3eb37ec393e616d"}, {
                        "label": "其他",
                        "value": "5a6ed68269ba4233bea31d72978f2ff9"
                    }], "label": "达州", "value": "cfa7c511d75f4fc99d0e567fae688873"
                }, {
                    "children": [{"label": "雨城区", "value": "a321175b89ff4f9fae090615caf9627b"}, {
                        "label": "芦山县",
                        "value": "7b71d1dbee4948a08010feb66caf3de2"
                    }, {"label": "石棉县", "value": "1ac72358e6d2429daf8e1eb05e308933"}, {
                        "label": "名山县",
                        "value": "acba0b81d0104757bc2b9fb824e7f06a"
                    }, {"label": "天全县", "value": "d0351eff303946f6a47ade684f74e4e7"}, {
                        "label": "荥经县",
                        "value": "17cd6aed6f6a41749abc1193c79a6ade"
                    }, {"label": "宝兴县", "value": "64ff8d092cf1475198fd46df25806f1a"}, {
                        "label": "汉源县",
                        "value": "b3f2ab15720b41398c86ca29b8718d50"
                    }, {"label": "其他", "value": "0e5853dd27e441ef9bc85b719d1d7b18"}],
                    "label": "雅安",
                    "value": "fa8588a7a5fa483687e8a3fda16c4d3b"
                }, {
                    "children": [{"label": "巴州区", "value": "8cfa6c62a0724adbaf45a049548eebec"}, {
                        "label": "南江县",
                        "value": "6588e6fc47814e23ac9174ea406329ee"
                    }, {"label": "平昌县", "value": "3b07a7588f5949fc83f79ec244ef3c2f"}, {
                        "label": "通江县",
                        "value": "92edf5ae90074e0aa511d37c9df350ec"
                    }, {"label": "其他", "value": "dbc761e075174f7d91ac8969fddef121"}],
                    "label": "巴中",
                    "value": "c8a9a4662f71471db6412f88641854eb"
                }, {
                    "children": [{"label": "雁江区", "value": "fdac04111aaa45cdba9a684aaf36e836"}, {
                        "label": "简阳市",
                        "value": "4c75246b6fae4ea2800d46f759d3cd74"
                    }, {"label": "安岳县", "value": "dea949d836ec44e7be489ca6d0f3f47d"}, {
                        "label": "乐至县",
                        "value": "02fc419f12204b36b0c31e86565aa777"
                    }, {"label": "其他", "value": "a375eb2e7ffd4dd08d4812912ed75c34"}],
                    "label": "资阳",
                    "value": "ba901bfd13954ec3b8011b33b5276cef"
                }, {
                    "children": [{"label": "马尔康县", "value": "85eb57d7bed94eb4a868158251d167cf"}, {
                        "label": "九寨沟县",
                        "value": "284f4eb4f348441e8e109cd71703cbb5"
                    }, {"label": "红原县", "value": "8e99fc7c67f249acba3bd2b358f06b57"}, {
                        "label": "汶川县",
                        "value": "8b5be22fa930403188edc6469ce301ac"
                    }, {"label": "阿坝县", "value": "ee2cf5637f04434d9957d2fb43abbb7d"}, {
                        "label": "理县",
                        "value": "e02e308371f949b1840e237c83947586"
                    }, {"label": "若尔盖县", "value": "222878dffc2c43cc9ad103bd84aa7d83"}, {
                        "label": "小金县",
                        "value": "1870cb56a71548afb19138766b2688f1"
                    }, {"label": "黑水县", "value": "b7c285114dd748ae9d19139c87a0aef1"}, {
                        "label": "金川县",
                        "value": "6f015fcc6bfe4f8ead2758e8523061b3"
                    }, {"label": "松潘县", "value": "e979720b4c624655a4dfcd67d33232de"}, {
                        "label": "壤塘县",
                        "value": "ebb95f1adf9447cab8c158f526800eb7"
                    }, {"label": "茂县", "value": "c3481572f13046f7b9c9e33d7ac70b1a"}, {
                        "label": "其他",
                        "value": "2f663c486b7c4ca79ace33d75d6d819c"
                    }], "label": "阿坝藏族羌族自治州", "value": "dc88455de8f2495389fd08fa0e0db9db"
                }, {
                    "children": [{"label": "康定县", "value": "12a4dbed6fee41b882b1a8228a8b6575"}, {
                        "label": "丹巴县",
                        "value": "7bb977816f1045cca76a5ea0435b9e43"
                    }, {"label": "炉霍县", "value": "7f7442d847514d32871751416be5a19b"}, {
                        "label": "九龙县",
                        "value": "9fb772d4e2ca4b369001e56158ecff22"
                    }, {"label": "甘孜县", "value": "7728a37c1ecb42fba36e49ba9ad947c8"}, {
                        "label": "雅江县",
                        "value": "41556aad609f40118bdf4626a12de6bf"
                    }, {"label": "新龙县", "value": "7d41b6727778449ea35dd3e810f06188"}, {
                        "label": "道孚县",
                        "value": "6c4e0f447bb64d37a53e7de52b27edad"
                    }, {"label": "白玉县", "value": "4405620b21a24f6a84de1ae03fcf580e"}, {
                        "label": "理塘县",
                        "value": "76192ca228d24ab08de0c6b4cb57d235"
                    }, {"label": "德格县", "value": "4ec239f61c9c44c4a6cefcc1c938840f"}, {
                        "label": "乡城县",
                        "value": "140669e51c5648c084cca52f00eeb3fc"
                    }, {"label": "石渠县", "value": "92894e5d42ba436fa3126db7a0e6d2ec"}, {
                        "label": "稻城县",
                        "value": "e6c45e7f5ce34c8d9fe0bda6ceec9b4a"
                    }, {"label": "色达县", "value": "8f0fa0e1b6e54834a4e1acf0e92d750b"}, {
                        "label": "巴塘县",
                        "value": "0feabb525b8b4b8da95c323d375789eb"
                    }, {"label": "泸定县", "value": "916d263fee9b405dbd8c41a54c16fb56"}, {
                        "label": "得荣县",
                        "value": "068d68d1cb764b779ecd5d3ab72636d3"
                    }, {"label": "其他", "value": "efb66773b4724de8bf1c45fe6c8ed4ad"}],
                    "label": "甘孜藏族自治州",
                    "value": "170070adbd7f4405b93d8cbb646c1ac9"
                }, {
                    "children": [{"label": "西昌市", "value": "cceb081335a54e2e89db5deb326d92f5"}, {
                        "label": "美姑县",
                        "value": "0673002a0bed479ca76f8e200271bea2"
                    }, {"label": "昭觉县", "value": "47713344d4234a0ba9d7738ba63a5655"}, {
                        "label": "金阳县",
                        "value": "e987bce191d7463391811284926a6810"
                    }, {"label": "甘洛县", "value": "4e4a38b370144b348e85c41d17c1dbe8"}, {
                        "label": "布拖县",
                        "value": "7db974215f994865927ae3f9591b8e10"
                    }, {"label": "雷波县", "value": "bd4e5862c26d4a99990a4c405dcf9fc8"}, {
                        "label": "普格县",
                        "value": "ea2f9faa33e14402b23b11e8824ee7aa"
                    }, {"label": "宁南县", "value": "d5174156b06b461fa46af5f4adeb0979"}, {
                        "label": "喜德县",
                        "value": "3e2582aabc314f6f95dddc39323b9fb8"
                    }, {"label": "会东县", "value": "0489c490f15841b0aceeda4988cd49a5"}, {
                        "label": "越西县",
                        "value": "59e5b4bdea544e6798fa35ddb79e3f44"
                    }, {"label": "会理县", "value": "f4db4b8daa964dc88d704a014fcb1361"}, {
                        "label": "盐源县",
                        "value": "170d0b8b045847239b90c1f4b3b3bcf3"
                    }, {"label": "德昌县", "value": "460d7e0cffaa430cab867b6bbeee3997"}, {
                        "label": "冕宁县",
                        "value": "76140e77c4e64a71ad98dd4018482593"
                    }, {"label": "木里藏族自治县", "value": "ebc942ce100c43b2952f50b36ad340dd"}, {
                        "label": "其他",
                        "value": "4b867fa05611425f8b1598a4ef91985c"
                    }], "label": "凉山彝族自治州", "value": "1e51f8f1df9f44ec8873546b515a9897"
                }, {
                    "children": [{"label": "其他", "value": "f86535286a7f4453b6416620d7334798"}],
                    "label": "其他",
                    "value": "cc9ec2c6afad47b38e8104c9ae684822"
                }], "label": "四川", "value": "fc278e07f80847df9181bc27121c43f3"
            }, {
                "children": [{
                    "children": [{
                        "label": "南明区",
                        "value": "6cdbb7bcb4dd442ea563e7c3b0a0b2e9"
                    }, {"label": "云岩区", "value": "ab480072d3ca43459ca8dd906ebbbd85"}, {
                        "label": "花溪区",
                        "value": "2d73a6d6b016431eb07d9ac7beeade58"
                    }, {"label": "乌当区", "value": "e222f1bee2934b06b86a8a093eb3632b"}, {
                        "label": "白云区",
                        "value": "1d395c6516a14bed83e65097af78a1d5"
                    }, {"label": "小河区", "value": "1e78cf68d9d2489080ec5a3f25b44ded"}, {
                        "label": "清镇市",
                        "value": "5743acbda0f246d8ad6f391536980325"
                    }, {"label": "开阳县", "value": "37ade7691d25433c977e5e0cbfce0e8c"}, {
                        "label": "修文县",
                        "value": "9f124a5f6073484ead69083389ec365f"
                    }, {"label": "息烽县", "value": "a6ea042806e04372accb14e80acb5174"}, {
                        "label": "其他",
                        "value": "e353240264d747f192f0c6f0495ec4db"
                    }], "label": "贵阳", "value": "2b05bfa6f26a4f12a275b59297acd5ad"
                }, {
                    "children": [{"label": "钟山区", "value": "d34d3ebbe3d24c13953b9c42823e5bb6"}, {
                        "label": "水城县",
                        "value": "147508332bae497b8f0d6cb60537629b"
                    }, {"label": "盘县", "value": "418b85ea832f42aaa637eb20b4151aee"}, {
                        "label": "六枝特区",
                        "value": "3f4d6a36be5344b58925c6ebaabf6505"
                    }, {"label": "其他", "value": "c0cef2b7a7c447e387c48b8c841c3570"}],
                    "label": "六盘水",
                    "value": "7b3949e7742f4bceae0c5b13c20576a3"
                }, {
                    "children": [{"label": "红花岗区", "value": "af65de72dc16474c8a8ce3fc955c1764"}, {
                        "label": "汇川区",
                        "value": "b5698efecade45a5a1cc66c7a87120c7"
                    }, {"label": "赤水市", "value": "6762bd0f94b24e1fa4b5dcaf32f9849a"}, {
                        "label": "仁怀市",
                        "value": "27ff53827d504c3e8d2f8814970d98c0"
                    }, {"label": "遵义县", "value": "69f6abaa5a1b4ae586c4c4d613ce4b51"}, {
                        "label": "绥阳县",
                        "value": "0deb10c81f924d15866edf8e05f56205"
                    }, {"label": "桐梓县", "value": "06aab4b6354748d78130cf8db04ab172"}, {
                        "label": "习水县",
                        "value": "4a058dd7fbbf4ec48dbb7faaadef91e6"
                    }, {"label": "凤冈县", "value": "94684833a7e24de0b3a93f69515370c9"}, {
                        "label": "正安县",
                        "value": "b3464f9e090b4003b61cca722540cc17"
                    }, {"label": "余庆县", "value": "ecff3dac088847a3b4c78b048dbc8e15"}, {
                        "label": "湄潭县",
                        "value": "02b5f214c2584c0e8c3d7d69a19ae712"
                    }, {"label": "道真仡佬族苗族自治县", "value": "2300b02e686e42c9b4bccc9025cfc62b"}, {
                        "label": "务川仡佬族苗族自治县",
                        "value": "1fd70cf9b15740f6991b82c0a687a7a0"
                    }, {"label": "其他", "value": "2f2b6a01d9bc413cba3fb58fe35e0ef2"}],
                    "label": "遵义",
                    "value": "070fd982f89944eebc7d614e5cc0b397"
                }, {
                    "children": [{"label": "西秀区", "value": "174ca2ad49d94ea3bf4480596baf0c43"}, {
                        "label": "普定县",
                        "value": "1bde7737bb184e90b9e290475b349c89"
                    }, {"label": "平坝县", "value": "295187b6321f4fa6b877f4b7c239ce41"}, {
                        "label": "镇宁布依族苗族自治县",
                        "value": "a21754d2bb434f3fb87ff00e4d0132e9"
                    }, {"label": "紫云苗族布依族自治县", "value": "2c46e4cb26a54bfd915a9dab5dc39948"}, {
                        "label": "关岭布依族苗族自治县",
                        "value": "f86fe6a1391942199be41361529d5859"
                    }, {"label": "其他", "value": "76539186e9c844b58162b976c991ffbc"}],
                    "label": "安顺",
                    "value": "709e3f35c2004f72b31c5ce53cda0380"
                }, {
                    "children": [{"label": "铜仁市", "value": "208b8d66cd2343daaea043a9b8525f08"}, {
                        "label": "德江县",
                        "value": "84962a9bd3994076a1f1dcbde9cf020b"
                    }, {"label": "江口县", "value": "5108d65efdc24b65b6bbbda4f257f009"}, {
                        "label": "思南县",
                        "value": "105ea50dda2149ca9582716102f52e50"
                    }, {"label": "石阡县", "value": "1bc12f12a7d44ebd9caf30ec0ebeef7c"}, {
                        "label": "玉屏侗族自治县",
                        "value": "89526a65b8b440d491b3e6a748d591b3"
                    }, {"label": "松桃苗族自治县", "value": "d0742e5634ba4501b1917250d27e0b07"}, {
                        "label": "印江土家族苗族自治县",
                        "value": "92ca56ddb4134e00a05c804f4fef636b"
                    }, {"label": "沿河土家族自治县", "value": "4244f0adf4ea44f598e74ce709993250"}, {
                        "label": "万山特区",
                        "value": "850a409627bf4aaabe235181cea7c57f"
                    }, {"label": "其他", "value": "c74b2d82e5de4896ba0647ae2d72f2ae"}],
                    "label": "铜仁地区",
                    "value": "e29f38cf031143a3bf6f62b3d7b884b0"
                }, {
                    "children": [{"label": "毕节市", "value": "9d17b1dd3275420eb5b0c7a547785414"}, {
                        "label": "黔西县",
                        "value": "4d926ad3b0dc4008b79e54a294ff4a9b"
                    }, {"label": "大方县", "value": "a6145a32b0274be0bc10cee8ec5ab2e9"}, {
                        "label": "织金县",
                        "value": "9c08c33874ad4e22bca2c00cf19d9b40"
                    }, {"label": "金沙县", "value": "7e2c06828c1546d28a5fb8336bd630f1"}, {
                        "label": "赫章县",
                        "value": "3427eaf593474d699ffe1ae64f7763f3"
                    }, {"label": "纳雍县", "value": "ea62d9230c6d4fe3889c364030b0b18e"}, {
                        "label": "威宁彝族回族苗族自治县",
                        "value": "6d18807ecf33478ab37fcc3a4118e75e"
                    }, {"label": "其他", "value": "815fa9e3963e4f70a26713ffd818851e"}],
                    "label": "毕节地区",
                    "value": "0455acc9f2c04480852eb70e1e6d7733"
                }, {
                    "children": [{"label": "兴义市", "value": "ee661a4a834f43828268788c01b3420c"}, {
                        "label": "望谟县",
                        "value": "16fe41c23f9e488a822b346231061289"
                    }, {"label": "兴仁县", "value": "993b80d5e26b475d9ee92ecb2de9da5c"}, {
                        "label": "普安县",
                        "value": "53927a714f314e2d8cc55856010f712e"
                    }, {"label": "册亨县", "value": "8f5fbd813e4a4e1f8f255cb9168be1be"}, {
                        "label": "晴隆县",
                        "value": "4991670e381f4161be374875b8fc460a"
                    }, {"label": "贞丰县", "value": "d99d0c594568426ca5f6a908fe3f6105"}, {
                        "label": "安龙县",
                        "value": "8b15c85311f546bfaa251eb41cd9e2e8"
                    }, {"label": "其他", "value": "0aa967ff5b154f5e8d4e5f81cf6695b1"}],
                    "label": "黔西南布依族苗族自治州",
                    "value": "68c9bea8b1c04f1986584dbb4983f507"
                }, {
                    "children": [{"label": "凯里市", "value": "ca560c7670c24b3aa36f8378165ff1ac"}, {
                        "label": "施秉县",
                        "value": "02b2cfbe141b41f0a494e683cc48f715"
                    }, {"label": "从江县", "value": "7fcaa40de0204033b86f528509d29b4d"}, {
                        "label": "锦屏县",
                        "value": "6341f011ed0743e98130fb22ccea742b"
                    }, {"label": "镇远县", "value": "93c477fafe414fc387f22be229d7190a"}, {
                        "label": "麻江县",
                        "value": "fdab8a591edc4cfe97d5d256fe51d02c"
                    }, {"label": "台江县", "value": "db4ca32336c7448c84f543fd0d1c99a5"}, {
                        "label": "天柱县",
                        "value": "30fd85c07f6d4057be453dbf3d423253"
                    }, {"label": "黄平县", "value": "e028ca1060ee4c9fae082f3fc4034817"}, {
                        "label": "榕江县",
                        "value": "687fc04c0df2411a98448d1e8b168931"
                    }, {"label": "剑河县", "value": "160ba25c5a654ea180ee861b3fef7879"}, {
                        "label": "三穗县",
                        "value": "5e802bf30526441c9f7b4c035adc3791"
                    }, {"label": "雷山县", "value": "bb6251bd56a44191afb66265a04722c5"}, {
                        "label": "黎平县",
                        "value": "719e5c9e2a0146e7bef100abfe470e0c"
                    }, {"label": "岑巩县", "value": "5eda50e126e343aa908aa1b23806f22a"}, {
                        "label": "丹寨县",
                        "value": "d37d8be1d1df4ffd81757e92a277e25b"
                    }, {"label": "其他", "value": "1d8b9ce6fda649f7bc15218880cb6cdd"}],
                    "label": "黔东南苗族侗族自治州",
                    "value": "848f3b969bb84b989a01b9c45749817d"
                }, {
                    "children": [{"label": "都匀市", "value": "7494e11be136496fbbcaf4047610085c"}, {
                        "label": "福泉市",
                        "value": "4fd913026c9a48d8bf87122a9bc4c351"
                    }, {"label": "贵定县", "value": "bc011b00fd1a438996f9041b7a39b372"}, {
                        "label": "惠水县",
                        "value": "ea5de2305f0f4308a2a376723dc68b47"
                    }, {"label": "罗甸县", "value": "6c891921a625447ba6d66b5c2622c465"}, {
                        "label": "瓮安县",
                        "value": "9f7fd761de154614b9f15edfadddf5c2"
                    }, {"label": "荔波县", "value": "b9586e341ac242eda6c35aa9261b8703"}, {
                        "label": "龙里县",
                        "value": "7f5e6793556f4e0e81efdd4bd6209a88"
                    }, {"label": "平塘县", "value": "ca9e6793d1844746ab2591ea6e852a8f"}, {
                        "label": "长顺县",
                        "value": "2817504260f647ec8f3b500676f4f316"
                    }, {"label": "独山县", "value": "35b45cf06123462aa365813d82920640"}, {
                        "label": "三都水族自治县",
                        "value": "fa11d15db6a04a1199ba4b8cc927e30d"
                    }, {"label": "其他", "value": "89a6fd984f9941d1bf13905dbb700a49"}],
                    "label": "黔南布依族苗族自治州",
                    "value": "e112bf4baea24bd0950b9c2aaccc0e28"
                }, {
                    "children": [{"label": "其他", "value": "3956cc36bb7e48a3a447db9b377c8bf1"}],
                    "label": "其他",
                    "value": "7f6a7af9aae84637bd64e1f3479bd7fd"
                }], "label": "贵州", "value": "8d8d6a9303364597a1ccd405efa1d1f9"
            }, {
                "children": [{
                    "children": [{
                        "label": "盘龙区",
                        "value": "f7d6bd40cf454a34957a3c84e44119b9"
                    }, {"label": "五华区", "value": "62b6abf071c342f9b36b8e452d3975fe"}, {
                        "label": "官渡区",
                        "value": "0025acc432224fcca7e8604a65301769"
                    }, {"label": "西山区", "value": "511776d187964daf9d30438943fb0b65"}, {
                        "label": "东川区",
                        "value": "01dfb8832107412b8f2e0418aff6ed6c"
                    }, {"label": "安宁市", "value": "f6a7bc9d3b64402ca5d04b133b7f2d11"}, {
                        "label": "呈贡县",
                        "value": "b39871902da6464dbcd4e53ee5f498de"
                    }, {"label": "晋宁县", "value": "611590dc20704a77a3c6f6451135f855"}, {
                        "label": "富民县",
                        "value": "3e2bb5fad9794e84b335411ed149128d"
                    }, {"label": "宜良县", "value": "8983184d5d3e4c4da99d0944e954d46b"}, {
                        "label": "嵩明县",
                        "value": "b02fec8f249e4920bcf24a4a63b4ad42"
                    }, {"label": "石林彝族自治县", "value": "0e28616769db4d4983c4647330c739ee"}, {
                        "label": "禄劝彝族苗族自治县",
                        "value": "33f8110de02c44ff8427df40d24b9de4"
                    }, {"label": "寻甸回族彝族自治县", "value": "68b4d672f6c94e49a141630c84dd7e80"}, {
                        "label": "其他",
                        "value": "43c4d956eed34cb4b25034abc06bb343"
                    }], "label": "昆明", "value": "dad308bf119642a1b66e768f8eba8eb5"
                }, {
                    "children": [{"label": "麒麟区", "value": "cfdad6c1c665426ca7ff3926bc51d17a"}, {
                        "label": "宣威市",
                        "value": "0fbc718591c9425a8017f6eccb11f883"
                    }, {"label": "马龙县", "value": "c26b5fd7d94542e0adc05f27a02e6fa9"}, {
                        "label": "沾益县",
                        "value": "efe57fee39bc45f0b925bbe06466ab6d"
                    }, {"label": "富源县", "value": "4b9f3b33292840b78bdd4a7a911a8e80"}, {
                        "label": "罗平县",
                        "value": "dfc62e88e45d44d296b6aaf78f581794"
                    }, {"label": "师宗县", "value": "7bd80c62077f4edfa0a415d5f2c9b5f9"}, {
                        "label": "陆良县",
                        "value": "dd75a59667014eec8f0de08a55df6fdc"
                    }, {"label": "会泽县", "value": "b9eebb41a34a449fafe959297a934342"}, {
                        "label": "其他",
                        "value": "1ab22ea9373d47f7882338c7afec8906"
                    }], "label": "曲靖", "value": "e46cc83c27154ce88fc8d7b2f9754cf0"
                }, {
                    "children": [{"label": "红塔区", "value": "83135ee52bfc48f392a3e820e7e20b6b"}, {
                        "label": "江川县",
                        "value": "8cd6da97831b48a59856d7550c9d61a7"
                    }, {"label": "澄江县", "value": "f54d005f3fec49289e8585b23516e5a8"}, {
                        "label": "通海县",
                        "value": "ebaa076cc47f400e8ffeb66371b3a3f6"
                    }, {"label": "华宁县", "value": "ffbba6c637fa4b4abcbbb09278d0a9c6"}, {
                        "label": "易门县",
                        "value": "7d8b051c8147428e90f333aea90041c5"
                    }, {"label": "峨山彝族自治县", "value": "741083f89dcc4386ad47de0733c485fc"}, {
                        "label": "新平彝族傣族自治县",
                        "value": "1c8f2258d556470b9862bfc60f901adf"
                    }, {"label": "元江哈尼族彝族傣族自治县", "value": "f77ac5e9a1474b2abff3e595a2918591"}, {
                        "label": "其他",
                        "value": "58490d6e31b34a3190e3bcbda5af4c4c"
                    }], "label": "玉溪", "value": "a27dcab3479048ad92fcf8cb909149fb"
                }, {
                    "children": [{"label": "隆阳区", "value": "5827b8b5351442cbac8e00cc2df3e17d"}, {
                        "label": "施甸县",
                        "value": "f486901d92e4460b9b7ce075032baca3"
                    }, {"label": "腾冲县", "value": "7d9bb271dae14d109934bc89db17c75c"}, {
                        "label": "龙陵县",
                        "value": "aa65916c62ed4d019b282263a3cdc084"
                    }, {"label": "昌宁县", "value": "0fa38a827af44d12973862df2f1d1e60"}, {
                        "label": "其他",
                        "value": "2da2036ddaa94704a9030ec90c1ebee9"
                    }], "label": "保山", "value": "9de4a340b58b419591b0ef5e4f11bc29"
                }, {
                    "children": [{"label": "昭阳区", "value": "c7e7e8f2291d4450846f36d4e74f497d"}, {
                        "label": "鲁甸县",
                        "value": "d9d048bc844c44b389781b9804d5dd09"
                    }, {"label": "巧家县", "value": "77dbf0b91880423fb8864242cf820b7b"}, {
                        "label": "盐津县",
                        "value": "9ab022b83a4c4ed3a995c8ad7a916135"
                    }, {"label": "大关县", "value": "7ff1e17fe3b144c099066d529237da75"}, {
                        "label": "永善县",
                        "value": "d1b2cab8d55d4257877ccdbf97db7a76"
                    }, {"label": "绥江县", "value": "219cb5e9e4874187afc424c24a19689b"}, {
                        "label": "镇雄县",
                        "value": "2efc325eb58c408f9cceb16784da8830"
                    }, {"label": "彝良县", "value": "90cf3049299c4e249fbfce5523887a18"}, {
                        "label": "威信县",
                        "value": "6376378662724d53b415621433b4a05e"
                    }, {"label": "水富县", "value": "760bc7d7261943aeb0f98fbf7006d67c"}, {
                        "label": "其他",
                        "value": "78b24f747fe2410aa87c3ddda8427185"
                    }], "label": "昭通", "value": "9ebe5d19d6304b23973c05a6ee548da0"
                }, {
                    "children": [{"label": "古城区", "value": "8ce3e7253e53404e9166bb92731a7da5"}, {
                        "label": "永胜县",
                        "value": "98800fc86d02434ea79daf1b288a655e"
                    }, {"label": "华坪县", "value": "548802974fb746cdb41c1623d2edc228"}, {
                        "label": "玉龙纳西族自治县",
                        "value": "b56c8187256548a581a5d99231ddfaa4"
                    }, {"label": "宁蒗彝族自治县", "value": "254d896afc274c598bb73ff633c37be8"}, {
                        "label": "其他",
                        "value": "dd6d8a72b77e40149b85b8a368601e92"
                    }], "label": "丽江", "value": "800a4286f49b4a4fb7386c543204b41e"
                }, {
                    "children": [{"label": "思茅区", "value": "718e10574ef94632bd08aac3c3081e99"}, {
                        "label": "普洱哈尼族彝族自治县",
                        "value": "943c93a2592b482e85e2a60db123264a"
                    }, {"label": "墨江哈尼族自治县", "value": "82ba3ee3cf87474e9ee7db4078c3b417"}, {
                        "label": "景东彝族自治县",
                        "value": "95115ba9d37446a59b82e61556ba6a49"
                    }, {"label": "景谷傣族彝族自治县", "value": "453883f60b804ce5bace0f9d24ed1cb0"}, {
                        "label": "镇沅彝族哈尼族拉祜族自治县",
                        "value": "7d394e00309b4476915470e3aa4801f2"
                    }, {"label": "江城哈尼族彝族自治县", "value": "5ee0951fda3a48d6bb421a9f80f0eb06"}, {
                        "label": "孟连傣族拉祜族佤族自治县",
                        "value": "540071066cbb41f0a99fd1229ca23fea"
                    }, {"label": "澜沧拉祜族自治县", "value": "092188d132104fc984c860afe72ed920"}, {
                        "label": "西盟佤族自治县",
                        "value": "5a4ff3443dac4c099d05261133d3761a"
                    }, {"label": "其他", "value": "24e29ea4b43443bf8c3fa30729f79e57"}],
                    "label": "普洱",
                    "value": "5a195d54e6ec445c9a05f7dfc895cf0a"
                }, {
                    "children": [{"label": "临翔区", "value": "75505a230531430283a5d80b5870320e"}, {
                        "label": "凤庆县",
                        "value": "9e993a9aa47d48f4854fda9e6fae12ac"
                    }, {"label": "云县", "value": "48da6726a3a2415db5495ee05e7d6078"}, {
                        "label": "永德县",
                        "value": "22ee46a21f564c588a58bfba3f3e3cf1"
                    }, {"label": "镇康县", "value": "1bca2dc9047b4d9a8fe3d98ffe6aee77"}, {
                        "label": "双江拉祜族佤族布朗族傣族自治县",
                        "value": "26be5988a2424c7ca606d5ef33b4941a"
                    }, {"label": "耿马傣族佤族自治县", "value": "27f7c0e1e5b34a628f5952cb2af941ef"}, {
                        "label": "沧源佤族自治县",
                        "value": "25cd53cea182443789e04f50f98c5f33"
                    }, {"label": "其他", "value": "01bed53f17a74e00a821dab37b408d29"}],
                    "label": "临沧",
                    "value": "ed167015308e434f8f87de21b8c305b0"
                }, {
                    "children": [{"label": "潞西市", "value": "92399c049f9840838b3d17412dfe8c0e"}, {
                        "label": "瑞丽市",
                        "value": "db53b02da0d34401bb0a7bd14d698f8f"
                    }, {"label": "梁河县", "value": "b23400d4b6ac4ff98142f36f8a27181e"}, {
                        "label": "盈江县",
                        "value": "8a594e15631344a48e92adde178f1fbe"
                    }, {"label": "陇川县", "value": "92d159a63e0a4cdbbcb81d0c0b33993d"}, {
                        "label": "其他",
                        "value": "8cbea8a6f0974416aa18334e0284ae70"
                    }], "label": "德宏傣族景颇族自治州", "value": "363e86c56d9144a69c4815f01e200dd5"
                }, {
                    "children": [{"label": "泸水县", "value": "1ef16b6735df49488d5be193596e6773"}, {
                        "label": "福贡县",
                        "value": "f37fa4f702bc4e1d9bd622386f19cf8e"
                    }, {"label": "贡山独龙族怒族自治县", "value": "1d2041b7990e4b48bfbc765fe2be3fe8"}, {
                        "label": "兰坪白族普米族自治县",
                        "value": "bf0d7e76ebfc4504bd25482a5ce47b5c"
                    }, {"label": "其他", "value": "6633e6f2070c4437a7bc4d3a3615ee56"}],
                    "label": "怒江傈僳族自治州",
                    "value": "80d183a508264d16b8ba1b2739558510"
                }, {
                    "children": [{"label": "香格里拉县", "value": "21cfbc20e16f4ea89083f2206bd99e3b"}, {
                        "label": "德钦县",
                        "value": "414ce61f409f492daeacf1790c80d3b3"
                    }, {"label": "维西傈僳族自治县", "value": "68f5398de4964f8b86e0ab14e70ee0fe"}, {
                        "label": "其他",
                        "value": "5ce989167d0748eb9101c0e2d4b5ce59"
                    }], "label": "迪庆藏族自治州", "value": "57c40148ffbb4e36996b8f47d7807775"
                }, {
                    "children": [{"label": "大理市", "value": "ea12a3a76792450dad636589c1b27d62"}, {
                        "label": "祥云县",
                        "value": "a4ce0dcdd15749baa258fb24eec11666"
                    }, {"label": "宾川县", "value": "e7f48176f71543ec8d632c7f20e86173"}, {
                        "label": "弥渡县",
                        "value": "b5e8dad2730b4e55960c6f9b83b35bd5"
                    }, {"label": "永平县", "value": "208070d386364917b967095c062e75fc"}, {
                        "label": "云龙县",
                        "value": "7ba6d579606248a7a7f398ae285ae3be"
                    }, {"label": "洱源县", "value": "fb70b2ecf68b4096a5cb187b251e736d"}, {
                        "label": "剑川县",
                        "value": "6cb94aa958aa4522a65c9f401aff7288"
                    }, {"label": "鹤庆县", "value": "f0f234dc89a249758674f8337250d920"}, {
                        "label": "漾濞彝族自治县",
                        "value": "7041474670914d5e8e18b8349bd0087c"
                    }, {"label": "南涧彝族自治县", "value": "5ae023e51f7b4243b548ab6e14cab264"}, {
                        "label": "巍山彝族回族自治县",
                        "value": "2fa8666505c847d99919a655eac8cbd1"
                    }, {"label": "其他", "value": "ba49902529e24f548277623503c586a9"}],
                    "label": "大理白族自治州",
                    "value": "5c0f2d6b9c634ea1ba3179029991dc19"
                }, {
                    "children": [{"label": "楚雄市", "value": "67cd2d8471b84849b9cebb9e7f8ba9cc"}, {
                        "label": "双柏县",
                        "value": "1d981a19dc564ddf85366d788a34891f"
                    }, {"label": "牟定县", "value": "2a6b9198ffe247c2a9411b854fac7a53"}, {
                        "label": "南华县",
                        "value": "7a875b6cd6e44737b96a10cc1ce84374"
                    }, {"label": "姚安县", "value": "e329ff5a6bfe4dd2aa53af007c536768"}, {
                        "label": "大姚县",
                        "value": "50adca16e5994239b1619ade36c5df76"
                    }, {"label": "永仁县", "value": "9f22f8a01eb54e469b409fc0e90d63dd"}, {
                        "label": "元谋县",
                        "value": "a5001f9d87ed48b18c093c0a295e9f5c"
                    }, {"label": "武定县", "value": "3485b661c8774c47b6060a55ec94db1c"}, {
                        "label": "禄丰县",
                        "value": "b520d2ad4ad643f7837977ab279f4dea"
                    }, {"label": "其他", "value": "fb484d58c02a4b56bde68279b17b5393"}],
                    "label": "楚雄彝族自治州",
                    "value": "9dc669ea8a314e56a7063fd305277e1d"
                }, {
                    "children": [{"label": "蒙自县", "value": "05c3f8d4b80e44e5b66d8045ae9749e0"}, {
                        "label": "个旧市",
                        "value": "1376e99430ab424f9d80453b1c2d9be3"
                    }, {"label": "开远市", "value": "1ec271b6064346128824ae6fa38b5f79"}, {
                        "label": "绿春县",
                        "value": "589f7755a30e426ca15606393c5ce420"
                    }, {"label": "建水县", "value": "da7a168ad267465ebaeb72950a266d2a"}, {
                        "label": "石屏县",
                        "value": "3ac26fa5552145b0af1cdd398ef91d98"
                    }, {"label": "弥勒县", "value": "6af15bfc9e5249cf8f44b4abf5837dd2"}, {
                        "label": "泸西县",
                        "value": "3b34eb0b3dff4f1ebee30a4a35e89cd2"
                    }, {"label": "元阳县", "value": "f33a990677614b369d62f74d2e094e47"}, {
                        "label": "红河县",
                        "value": "0f6894ec7a6e4c85aa2e84b9807c0204"
                    }, {"label": "金平苗族瑶族傣族自治县", "value": "68c6c33c518848bba78275c17f3ad441"}, {
                        "label": "河口瑶族自治县",
                        "value": "06eaa09318524c3597f602ae55fa0c06"
                    }, {"label": "屏边苗族自治县", "value": "4778ad285f114d2cb8c7e90ecfecd575"}, {
                        "label": "其他",
                        "value": "770244fb9ca84dc9ba2b36b1efe96075"
                    }], "label": "红河哈尼族彝族自治州", "value": "939452e6fb734c45995269c8a82857c7"
                }, {
                    "children": [{"label": "文山县", "value": "9ca14077a573419e92d03902aee82939"}, {
                        "label": "砚山县",
                        "value": "871373466d6848658ca52b3723536deb"
                    }, {"label": "西畴县", "value": "d37734428d0546fabde149d033f42ab4"}, {
                        "label": "麻栗坡县",
                        "value": "00c8114c3ca14d63b7ba49c78e3bf645"
                    }, {"label": "马关县", "value": "54ee1c7a13ac44e098b98e342ce4f262"}, {
                        "label": "丘北县",
                        "value": "9423fc8f666040a78d6be0dcd66aeb3b"
                    }, {"label": "广南县", "value": "dc14335b348c450a81ecc9bd1764e2ca"}, {
                        "label": "富宁县",
                        "value": "ddb6214d25424c4487b47072464e8cdc"
                    }, {"label": "其他", "value": "66c9959c4c1047edbfb1eb34f766de29"}],
                    "label": "文山壮族苗族自治州",
                    "value": "251218dada3c418b87295b69d7f4e949"
                }, {
                    "children": [{"label": "景洪市", "value": "22f3773766384ad398fe246ec41fc881"}, {
                        "label": "勐海县",
                        "value": "8ea1eb4d81dc495197e1510f190cd0c7"
                    }, {"label": "勐腊县", "value": "6c4ed20319cb47d39c34de2dfc2da200"}, {
                        "label": "其他",
                        "value": "f4ca70a230f14ccab640b8e720a2cbee"
                    }], "label": "西双版纳傣族自治州", "value": "54e12aa6f0ef4fa38c08bcc930e83ced"
                }, {
                    "children": [{"label": "其他", "value": "e35354c5e47b47d5bd6f6b6cfeb0c357"}],
                    "label": "其他",
                    "value": "893b5c01a71847138ed2bc703586d7ca"
                }], "label": "云南", "value": "92345eb606a848418cc9b87b80606d55"
            }, {
                "children": [{
                    "children": [{
                        "label": "城关区",
                        "value": "4a8516dd8c5b453391e623472c24b3f3"
                    }, {"label": "林周县", "value": "7cebe816c1a6492485e6df7dc680f55f"}, {
                        "label": "当雄县",
                        "value": "08b4615d55934cd1b7349a7e6d2022e5"
                    }, {"label": "尼木县", "value": "58d6a127b8cc4194860f629dafa2a4ed"}, {
                        "label": "曲水县",
                        "value": "ec59439d84f14a61adc3a2fd29108671"
                    }, {"label": "堆龙德庆县", "value": "95422109029d49ab803c553958a50382"}, {
                        "label": "达孜县",
                        "value": "ba59c23e5dc94d64806ba286d44ba92c"
                    }, {"label": "墨竹工卡县", "value": "73704f62674641c79dd96174a620b420"}, {
                        "label": "其他",
                        "value": "7a145fd3a4234ffbaa2f9670113cbb76"
                    }], "label": "拉萨", "value": "29e8635939df4e5db1e53c00e8ae088d"
                }, {
                    "children": [{"label": "那曲县", "value": "bcf2bf163a8249ce87c5449d3218cf64"}, {
                        "label": "嘉黎县",
                        "value": "71435e7f2c1a4a2f8d55dab8ccbd47ff"
                    }, {"label": "比如县", "value": "1addd1e94c194eeab74c576ed71ea1b2"}, {
                        "label": "聂荣县",
                        "value": "f1b327079bb34a1f89d92376699cdc85"
                    }, {"label": "安多县", "value": "948db0f4d3514b06951ae5d9d93e3c54"}, {
                        "label": "申扎县",
                        "value": "68454be45b3a4441b68fc9f17b3b7a93"
                    }, {"label": "索县", "value": "7f77a038a74a42018eac8a455af34f85"}, {
                        "label": "班戈县",
                        "value": "6474f972b4ad49fbb3488962199806d8"
                    }, {"label": "巴青县", "value": "e38b13043c184baaac763ef3840aefb9"}, {
                        "label": "尼玛县",
                        "value": "f5f3e4efd1054ffba1865dd273ecb6be"
                    }, {"label": "其他", "value": "3741978ee9e845a1bdfb479d35774e45"}],
                    "label": "那曲地区",
                    "value": "c83d0abe2733423a86777d68df32e45f"
                }, {
                    "children": [{"label": "昌都县", "value": "a0606856a2e64d8783dea33233b4c976"}, {
                        "label": "江达县",
                        "value": "9d39334ebd114e6cbbedb8c799c7564b"
                    }, {"label": "贡觉县", "value": "f53ee7be8c64443cb37c648697f73d7e"}, {
                        "label": "类乌齐县",
                        "value": "a1f6c634232743ec9e5f53bb8cb8546a"
                    }, {"label": "丁青县", "value": "e23325f6e0a14efdad9dd0013b208a6e"}, {
                        "label": "察雅县",
                        "value": "57974c5cc02d4c8fa4a374f0ad67c013"
                    }, {"label": "八宿县", "value": "61ff5881906a4f7cac02d1beb76ea1cf"}, {
                        "label": "左贡县",
                        "value": "5cb0bd5b78164f9c92dbb66ae84ac55a"
                    }, {"label": "芒康县", "value": "069dd829cced438d9774521a952fd54e"}, {
                        "label": "洛隆县",
                        "value": "25e1440bea394453b94369f9b66f6f29"
                    }, {"label": "边坝县", "value": "bcf7a6b926f2493fa34f3121026ad42b"}, {
                        "label": "其他",
                        "value": "52dae0760f4b44c78b511e599502de88"
                    }], "label": "昌都地区", "value": "1de46572b12048e6975097290142cd5d"
                }, {
                    "children": [{"label": "林芝县", "value": "0a24bd48d3ea4383852922b65f7cc145"}, {
                        "label": "工布江达县",
                        "value": "647bac88c1c64917b91ae7dac19ea1f8"
                    }, {"label": "米林县", "value": "d49fdf0020d1450fb3c02b859d96b511"}, {
                        "label": "墨脱县",
                        "value": "cbaebddd60c6467383ec8951398029ee"
                    }, {"label": "波密县", "value": "cf795e93a25042788d3a2b8f81406611"}, {
                        "label": "察隅县",
                        "value": "068cba4cacf34c44afa5cc225209cfb4"
                    }, {"label": "朗县", "value": "4a1902d2fd3e4d32afb5746198d31afe"}, {
                        "label": "其他",
                        "value": "38222b0c43a243ea85f5423927b17d85"
                    }], "label": "林芝地区", "value": "e96c63af3c24418082ccd1e09e2e85b2"
                }, {
                    "children": [{"label": "乃东县", "value": "d418f82ee5584dd38162cb2b4a5b61f8"}, {
                        "label": "扎囊县",
                        "value": "c9520ee535af442d8c3b846c85820ffc"
                    }, {"label": "贡嘎县", "value": "b6d9db2d8f5e4e8c9504826818cc7573"}, {
                        "label": "桑日县",
                        "value": "8c47692de83d45d48db9db24b32005f7"
                    }, {"label": "琼结县", "value": "a7720f8f4e524522ae5a3699dc004fae"}, {
                        "label": "曲松县",
                        "value": "9b88e309ce1f4d7c8e736f6241d33335"
                    }, {"label": "措美县", "value": "f33d4bc0a426434eb47a49b295dbde92"}, {
                        "label": "洛扎县",
                        "value": "20565f741dad436a8b3752e7138bf271"
                    }, {"label": "加查县", "value": "e4c88b92ad2d465cb43a17c8e3b5d7a0"}, {
                        "label": "隆子县",
                        "value": "3045b5d1978b44f29f4c5165c08253dc"
                    }, {"label": "错那县", "value": "3cc764d30e2343e2a9610d78d21a37c6"}, {
                        "label": "浪卡子县",
                        "value": "249a19e9d68547f296a8b59d11e525a0"
                    }, {"label": "其他", "value": "e325664be73c4c328d401db7805c1b25"}],
                    "label": "山南地区",
                    "value": "8a1c845aa13e4c6cbd93ad7bc1083213"
                }, {
                    "children": [{"label": "日喀则市", "value": "cdc0e05ef96746aa87507d3be624f39f"}, {
                        "label": "南木林县",
                        "value": "589c865d1b45486b972ea8414769bc3d"
                    }, {"label": "江孜县", "value": "6574a2e020014cdebb75d34cb8708bc8"}, {
                        "label": "定日县",
                        "value": "1b44e3f45260493d95407c06548e0325"
                    }, {"label": "萨迦县", "value": "c1d2f6b97e8d44fc98642cd893d43506"}, {
                        "label": "拉孜县",
                        "value": "6191e288cf2645889dc2ec5fe379af5b"
                    }, {"label": "昂仁县", "value": "13feeb353b2b442d8cfa9be386329631"}, {
                        "label": "谢通门县",
                        "value": "de7914619ee444ddbcb010c8c7929789"
                    }, {"label": "白朗县", "value": "17c01c6f8c43426fbd9c4ffbfc0cb6ef"}, {
                        "label": "仁布县",
                        "value": "b34b1f0d9b864e9cad330f51e218417d"
                    }, {"label": "康马县", "value": "001a8329f1b041bc9c41cd9320f4ea44"}, {
                        "label": "定结县",
                        "value": "260bb40f33d74ab9b7795822f9150487"
                    }, {"label": "仲巴县", "value": "6e9007bdc42d4be0bc26e3a2725db210"}, {
                        "label": "亚东县",
                        "value": "665d04a81827493a809a9f6f701438ef"
                    }, {"label": "吉隆县", "value": "a2534601300e427b88db54d77ce0ee9c"}, {
                        "label": "聂拉木县",
                        "value": "014ecb57193e4a43978baa942a9e388f"
                    }, {"label": "萨嘎县", "value": "16d606cac9ee4d9bb46379ec5d46423d"}, {
                        "label": "岗巴县",
                        "value": "17d0fd01a3ee4296a2a3a42b90cd18bc"
                    }, {"label": "其他", "value": "c04cdbb6fa9748bfa6d1c0cc25728c35"}],
                    "label": "日喀则地区",
                    "value": "22420e4768f347b583c8e4db231c3d53"
                }, {
                    "children": [{"label": "噶尔县", "value": "e701bf750f10469fa5e6782bed2a6ee7"}, {
                        "label": "普兰县",
                        "value": "9c9957d86a10415d9ccc576834b50987"
                    }, {"label": "札达县", "value": "4c8c2ff2cf2b4331a2cc04cc6236bae3"}, {
                        "label": "日土县",
                        "value": "d79f4fbf4a994aac80565ce111ee665b"
                    }, {"label": "革吉县", "value": "40adc1307c0a4235a57c0ad09e69043e"}, {
                        "label": "改则县",
                        "value": "9159150f52654418994766ecb73bc786"
                    }, {"label": "措勤县", "value": "a81b79501f3747b892aa6c07c675ba4b"}, {
                        "label": "其他",
                        "value": "ec8301b06aec4998a014f44f83ea9cda"
                    }], "label": "阿里地区", "value": "cd92c2075172479b9cfa0c0d39892adf"
                }, {
                    "children": [{"label": "其他", "value": "e6cd0ed5137e4eabb1c0c7bb6ae6c1b3"}],
                    "label": "其他",
                    "value": "f0de1525c4814ffca87345781dc9570c"
                }], "label": "西藏", "value": "9c3c97f44f894880b91e0d40e6122bc7"
            }, {
                "children": [{
                    "children": [{
                        "label": "莲湖区",
                        "value": "30696eaf936f46bbad1b524c30ace739"
                    }, {"label": "新城区", "value": "5f3f1ed5cbda478bb413dc4386583370"}, {
                        "label": "碑林区",
                        "value": "0bb4b43cfcf940c598799633e8f9f178"
                    }, {"label": "雁塔区", "value": "5c348f467b9d4019a795f32860824e49"}, {
                        "label": "灞桥区",
                        "value": "62fed5ce115b4a11a4fed893d0c911c6"
                    }, {"label": "未央区", "value": "e2839494a96d4e61995981f5e96dbedc"}, {
                        "label": "阎良区",
                        "value": "58364eb9734c4a5a8ed767dfd9b6ba25"
                    }, {"label": "临潼区", "value": "1bb669b182584a34a98c4cdfb5661eb0"}, {
                        "label": "长安区",
                        "value": "ce4c13611ca24119a8bae1636934f34d"
                    }, {"label": "高陵县", "value": "862a8b9e06cd403190a288edbb818a74"}, {
                        "label": "蓝田县",
                        "value": "491e5003797242fbab4f34835fb89779"
                    }, {"label": "户县", "value": "7496570ee1bf41e8990851b63a6fb4a6"}, {
                        "label": "周至县",
                        "value": "0c0b867ea3014dc09be5308717f4c0ed"
                    }, {"label": "其他", "value": "b394920596d74267b4c94b11c16921e0"}],
                    "label": "西安",
                    "value": "db7e1683a12b41bbb37c582f0a6c519c"
                }, {
                    "children": [{"label": "耀州区", "value": "144de12082154571be65c4e87e0cc22d"}, {
                        "label": "王益区",
                        "value": "03763b45f5ff4b9f822f0ef4a9522d80"
                    }, {"label": "印台区", "value": "398a8abb907f4a2f9a6892c938ff14ff"}, {
                        "label": "宜君县",
                        "value": "704aa4e26aeb4c3488f4956bf80a12ff"
                    }, {"label": "其他", "value": "02f22dbf361040158c46b8ddc54be9b2"}],
                    "label": "铜川",
                    "value": "5b6d57a13d6849518beae468007ee327"
                }, {
                    "children": [{"label": "渭滨区", "value": "a6495fe99c1d4675b3b04957fc11d957"}, {
                        "label": "金台区",
                        "value": "cb53104b601f45be9d05901ade092f0c"
                    }, {"label": "陈仓区", "value": "e79710ee8d494c97a5da9722055f1be6"}, {
                        "label": "岐山县",
                        "value": "8d3818727be4479a9b0c9b48818d1003"
                    }, {"label": "凤翔县", "value": "6c1b473cc4144b84a6b27d3d0dcb2e26"}, {
                        "label": "陇县",
                        "value": "e24e0086ac2844ffa58a2a0c859aaf8f"
                    }, {"label": "太白县", "value": "6a19facd2b6c41e4a975321c62257312"}, {
                        "label": "麟游县",
                        "value": "98ca6754ee904d89b9e8b70d606c66fb"
                    }, {"label": "扶风县", "value": "c1415ef7d28c41bc889a68290cb64868"}, {
                        "label": "千阳县",
                        "value": "c86e6f8b0b414d4cbf057310c64b3a34"
                    }, {"label": "眉县", "value": "9c7c3925fb884aa38512f40ce8f4dddd"}, {
                        "label": "凤县",
                        "value": "0cc26e88571342bd92a537dc778d52ff"
                    }, {"label": "其他", "value": "541992c711844f0d8e8a89a58e2d8eaf"}],
                    "label": "宝鸡",
                    "value": "cad8632f12ac443abe04f230a8665065"
                }, {
                    "children": [{"label": "秦都区", "value": "697ec06a2ff7472884cfd4fa276862ff"}, {
                        "label": "渭城区",
                        "value": "59e4fb7ccdbb4f07b6b74e0d143119d0"
                    }, {"label": "杨陵区", "value": "0bb5c9f018714cfeb3fd29fc848b7f36"}, {
                        "label": "兴平市",
                        "value": "3c6da516a64f4f7bb4786993239adf3c"
                    }, {"label": "礼泉县", "value": "ec8b5522c5344e1b9a54c444de1443bb"}, {
                        "label": "泾阳县",
                        "value": "6231aef4bd424ff587941601451ecc30"
                    }, {"label": "永寿县", "value": "3fada915071c4d2cb3eebe78bf13fa56"}, {
                        "label": "三原县",
                        "value": "fb59635471bd42d6942b3a183fa14edd"
                    }, {"label": "彬县", "value": "473f8945f3a24704896c96661276affd"}, {
                        "label": "旬邑县",
                        "value": "8af51e0d62aa4984aef8c7d26fcfb118"
                    }, {"label": "长武县", "value": "a947533956cd48fc9ae19a59ad4be9ff"}, {
                        "label": "乾县",
                        "value": "f1e719fb76464a00a86515f865224dae"
                    }, {"label": "武功县", "value": "6db20ff43ae94f38bd5526f0306cefa7"}, {
                        "label": "淳化县",
                        "value": "96387ab6cd4e403d860ce4c1e6303c75"
                    }, {"label": "其他", "value": "fae729633e9744b89eab21c6f3faf03f"}],
                    "label": "咸阳",
                    "value": "e8af0267306b430bb93df349516e4a9c"
                }, {
                    "children": [{"label": "临渭区", "value": "d637e8fafc314f199a04cf52599c0157"}, {
                        "label": "韩城市",
                        "value": "e0a2cdf9494d49188ddc2c39d561ae37"
                    }, {"label": "华阴市", "value": "f385d7ecd3c24ed1b06cc5291c6fc9fb"}, {
                        "label": "蒲城县",
                        "value": "4559370cd0b4464ba5ad3f41d5f0a3e1"
                    }, {"label": "潼关县", "value": "97e8890737224932a5d77e959772d10f"}, {
                        "label": "白水县",
                        "value": "b65972d0f41b4e97bfd697b3222c22cb"
                    }, {"label": "澄城县", "value": "777efc2927854067a4bd0363abb27279"}, {
                        "label": "华县",
                        "value": "4ab927e351714408a91c342ca088a10c"
                    }, {"label": "合阳县", "value": "3dcbbfe997394d4697fcf7c04a3c4197"}, {
                        "label": "富平县",
                        "value": "cfebbd8593404337b85006e62bc77a6b"
                    }, {"label": "大荔县", "value": "7aa7a95728e1456a9f4c7b581784bb38"}, {
                        "label": "其他",
                        "value": "1eec0ebd714b4b2fab41d9b363b42c6e"
                    }], "label": "渭南", "value": "cc40bb58f7ce41d6a623625976d10302"
                }, {
                    "children": [{"label": "宝塔区", "value": "5ef31f81f48f4da480220d5ef06b9e4f"}, {
                        "label": "安塞县",
                        "value": "642c375615f24e4fb46065bfe40a61e4"
                    }, {"label": "洛川县", "value": "08f458e503744e2c8d106e3b11b36c23"}, {
                        "label": "子长县",
                        "value": "ce55fe3ad41d499386653a149b252334"
                    }, {"label": "黄陵县", "value": "b00a89965e3f4585849f5d1f2b731e2e"}, {
                        "label": "延川县",
                        "value": "9b3817539e694911859bb9cc2b4b7eb6"
                    }, {"label": "富县", "value": "f26116606eae45a3807e65d3077984d9"}, {
                        "label": "延长县",
                        "value": "ccdf88d87a91440ea59b2f5f04427070"
                    }, {"label": "甘泉县", "value": "31dec50b43d1474b8069f4ea93a65eb2"}, {
                        "label": "宜川县",
                        "value": "ab45b14115ad449f98bbfd28376e842d"
                    }, {"label": "志丹县", "value": "e8cf3cb2832e4c3fbc3ff90027fb446c"}, {
                        "label": "黄龙县",
                        "value": "a811a0283b61476fb5efa1ec523777cf"
                    }, {"label": "吴起县", "value": "3240889d4a22446d8471b4ba8c1f5bad"}, {
                        "label": "其他",
                        "value": "2f2d8a3dfb674de08a237ef9158d6f8d"
                    }], "label": "延安", "value": "904946c11baf482d89a9f79e5bf63438"
                }, {
                    "children": [{"label": "汉台区", "value": "cd54c33631fa41dab7e1aa9fc4c6fd22"}, {
                        "label": "留坝县",
                        "value": "56c138745cf04e7da7fb913f6925b759"
                    }, {"label": "镇巴县", "value": "bc4417d9ab324f63b5760c243829fbf5"}, {
                        "label": "城固县",
                        "value": "7c03e83166a7476c94c34815220e51fb"
                    }, {"label": "南郑县", "value": "a44c8d451c3241438280348e660dc461"}, {
                        "label": "洋县",
                        "value": "69f9b07b7ec74ba6ac85014c49395dea"
                    }, {"label": "宁强县", "value": "25beba9b3cfb42b49283ed07c4e159f7"}, {
                        "label": "佛坪县",
                        "value": "61351e21b1b446889b8c20a908a75839"
                    }, {"label": "勉县", "value": "f65fc75f95d74f88840e7133eb19a516"}, {
                        "label": "西乡县",
                        "value": "191f3c96c37a4852818fa8a3b81f140c"
                    }, {"label": "略阳县", "value": "d459f3855cd547068be0ef3d9a47ebde"}, {
                        "label": "其他",
                        "value": "be6ea81419f3463995a72c633b72e451"
                    }], "label": "汉中", "value": "71c8a6da68194550a6cd6371f79ce2ab"
                }, {
                    "children": [{"label": "榆阳区", "value": "f2c512a7b5c54f8c8ea4b32aeecafc8d"}, {
                        "label": "清涧县",
                        "value": "deed7323d72e4514b9fde8ad4618cc10"
                    }, {"label": "绥德县", "value": "58377413908c40d79439b98109da41b0"}, {
                        "label": "神木县",
                        "value": "369c7914143d4cf3a3a4920afe6c49bc"
                    }, {"label": "佳县", "value": "ebe449c1960b4c3a8216cce5bf957238"}, {
                        "label": "府谷县",
                        "value": "600279f986454b299bedff50a55a7b09"
                    }, {"label": "子洲县", "value": "df653ee6c9ec47628ee83ae5490bcc7e"}, {
                        "label": "靖边县",
                        "value": "36301e5ee7ea457f8dc13ed15cc1f130"
                    }, {"label": "横山县", "value": "53e140e6201d47ec92a1572a041883ac"}, {
                        "label": "米脂县",
                        "value": "87a77f8653a54948b04cbb669cd21bb6"
                    }, {"label": "吴堡县", "value": "a1f6c07098ba476e87ee694c5fcd2838"}, {
                        "label": "定边县",
                        "value": "b067596bb7b54a9b860cb97fb2a30def"
                    }, {"label": "其他", "value": "5846e418710647d7b7c0b52aef770c44"}],
                    "label": "榆林",
                    "value": "5b46a4aae83d437a945896a28fed1766"
                }, {
                    "children": [{"label": "汉滨区", "value": "d00d451a029a40bca25ca2a95dfec86c"}, {
                        "label": "紫阳县",
                        "value": "a468dcf6606c4bf199fd0f71d2e1480c"
                    }, {"label": "岚皋县", "value": "63b2337994064d82b4dc630fdcc5596f"}, {
                        "label": "旬阳县",
                        "value": "7a5b7be4204f419fa19bb6b9f860a788"
                    }, {"label": "镇坪县", "value": "05a19c66c2664893bcf0defd3d0b32f2"}, {
                        "label": "平利县",
                        "value": "79de653e28914386b7229c27cef1b3c8"
                    }, {"label": "石泉县", "value": "7fd906b0652548908d3051be32731a89"}, {
                        "label": "宁陕县",
                        "value": "5de3f3b768234c76acd950a9b9cee4f5"
                    }, {"label": "白河县", "value": "d8abcb28892a4766841c09fba44fb467"}, {
                        "label": "汉阴县",
                        "value": "6145eeabb3d9422e943d77d46854be4b"
                    }, {"label": "其他", "value": "b2ab8e4fc3824246b06a65e8ccea72b7"}],
                    "label": "安康",
                    "value": "058fc7094dd84a6bb12604a8caf19b2b"
                }, {
                    "children": [{"label": "商州区", "value": "12a3c45d301844618563c0cb6c6036e6"}, {
                        "label": "镇安县",
                        "value": "82868aa13c56438f9738e85a14b2cba0"
                    }, {"label": "山阳县", "value": "60a5e84c1cea4b06a6f9d085587b3a7c"}, {
                        "label": "洛南县",
                        "value": "9d1b622316684f5990ec118222801503"
                    }, {"label": "商南县", "value": "cce3ebdad4144203be2571b7aa9f95ef"}, {
                        "label": "丹凤县",
                        "value": "85839af0bdb94894b79e4c6162f444d8"
                    }, {"label": "柞水县", "value": "9c8a9830c1064aff84910a45b3ef91a1"}, {
                        "label": "其他",
                        "value": "2c891266e1734228a38101ea407d3497"
                    }], "label": "商洛", "value": "cbe70daf0b21440cacbd04ddfb982471"
                }, {
                    "children": [{"label": "其他", "value": "233071eca5bb48fba6f6af365ce7d92c"}],
                    "label": "其他",
                    "value": "53fc638f5d27451a843680da5de860cd"
                }], "label": "陕西", "value": "28a0c6db8e0349f9bde29d53457b41ac"
            }, {
                "children": [{
                    "children": [{
                        "label": "城关区",
                        "value": "dfdb47cb441b4212a81d43d944f0a088"
                    }, {"label": "七里河区", "value": "f282c6ebe6194986a663a66fd7692885"}, {
                        "label": "西固区",
                        "value": "62bccb1194e4482188273a1162cc92ef"
                    }, {"label": "安宁区", "value": "1127745eac294346b64c25cd7c879982"}, {
                        "label": "红古区",
                        "value": "a80ed587294a4f23a01af371e4794d74"
                    }, {"label": "永登县", "value": "209a1ace5a0f49dcb0ff0e6c2adb8910"}, {
                        "label": "皋兰县",
                        "value": "5a526c80d89e48f786e85e49a37a6cf0"
                    }, {"label": "榆中县", "value": "26082581e2d24a178e180fa311b40807"}, {
                        "label": "其他",
                        "value": "f4823da5a8d84c8388957c93c2b43a65"
                    }], "label": "兰州", "value": "6e4e0bd5ee534e39a5cb2f59f4c5893c"
                }, {
                    "children": [{"label": "嘉峪关市", "value": "d2b0e09aaaf24baeba22da2134448f66"}, {
                        "label": "其他",
                        "value": "2d522c3e7d094fd09e2a00a965c16275"
                    }], "label": "嘉峪关", "value": "37c6b07076ae48b1ad0ae99eaf226284"
                }, {
                    "children": [{"label": "金川区", "value": "630c2eeacf7d45168717c6418c2117e1"}, {
                        "label": "永昌县",
                        "value": "fd493f00afb240f2ad8c71e127e99aea"
                    }, {"label": "其他", "value": "3120e88f669348b68bfc07dd77e5ab8d"}],
                    "label": "金昌",
                    "value": "f1cf514e2f1445ecb225d9c61064e3af"
                }, {
                    "children": [{"label": "白银区", "value": "6e4d3fe1e89644fd978a9ecaa1d74a78"}, {
                        "label": "平川区",
                        "value": "87f757f513d94c188f737ef8308e4992"
                    }, {"label": "靖远县", "value": "7857ce631b60455a811bb1516116c241"}, {
                        "label": "会宁县",
                        "value": "13dc97cbf0de4540a814b8d594e2c53d"
                    }, {"label": "景泰县", "value": "701ef49b5453402fb6df22bc342916bd"}, {
                        "label": "其他",
                        "value": "aacf7755ad49418985b3df63d73e5672"
                    }], "label": "白银", "value": "9ea8dca8a5d34bb79f055866cfa169e4"
                }, {
                    "children": [{"label": "清水县", "value": "b35e8752622c42928d9425c13c899cc6"}, {
                        "label": "秦安县",
                        "value": "42e70cb1177f4c3cbcc4311e18ebe61b"
                    }, {"label": "甘谷县", "value": "1173dc4f1b9845fabe5aeb555332e9ae"}, {
                        "label": "武山县",
                        "value": "cb94c6a41a5f4701b2efa22fc873a858"
                    }, {"label": "张家川回族自治县", "value": "f7297589620c463db7261c015529be55"}, {
                        "label": "北道区",
                        "value": "eb687e84cffa429eb0aa4d53314d40c5"
                    }, {"label": "秦城区", "value": "d2e42d587113420c9000fe4024e73f18"}, {
                        "label": "其他",
                        "value": "e67ee186d432482d92f14d35d87c30d7"
                    }], "label": "天水", "value": "6270a8cb42ec4ac49d5926d5bfe9e20d"
                }, {
                    "children": [{"label": "凉州区", "value": "cb7b1167e8fb47f5a165cba8d21676eb"}, {
                        "label": "民勤县",
                        "value": "bc3442c0150c41d4baeb756c3aacf081"
                    }, {"label": "古浪县", "value": "bdce59ecd2974f0f9b9e7013248f9f2e"}, {
                        "label": "天祝藏族自治县",
                        "value": "b7bc5ab710114e638ca3f131052ef912"
                    }, {"label": "其他", "value": "b9f0a35b3639449d9619f9c6fc9de92f"}],
                    "label": "武威",
                    "value": "86c16ef53c87451bab18fe750cc8351f"
                }, {
                    "children": [{"label": "肃州区", "value": "df14e89e71aa4a3d98d7a0f5be2aa03c"}, {
                        "label": "玉门市",
                        "value": "70dace0211d34d43a4c9149cbf951b32"
                    }, {"label": "敦煌市", "value": "a383c8b6fa254aba9cdf55d4f60f6090"}, {
                        "label": "金塔县",
                        "value": "54641772e26e4d408645b6f730f6dd4e"
                    }, {"label": "肃北蒙古族自治县", "value": "4ff5a1709922430f931dcd8d5c747866"}, {
                        "label": "阿克塞哈萨克族自治县",
                        "value": "e63fe5120ab449c9ab57b999a18d9887"
                    }, {"label": "安西县", "value": "09759a5d39944b2b9a68c5ea85b08314"}, {
                        "label": "其他",
                        "value": "bd9d8c1ad75e4c0f9b0ea3f0f6fa3579"
                    }], "label": "酒泉", "value": "6bb011207225403eab7f5f75e870d0c5"
                }, {
                    "children": [{"label": "甘州区", "value": "c3cf38847a544e819c6250a85e4e5ea5"}, {
                        "label": "民乐县",
                        "value": "2730273d1d3a42aca51c2cfda51a7f82"
                    }, {"label": "临泽县", "value": "c9d7caea6a39487287181976ed7fb09c"}, {
                        "label": "高台县",
                        "value": "a1c6983ebfcf4819964ea5dfcd7a9a26"
                    }, {"label": "山丹县", "value": "86623299d3f44d378c9484e2975dfb31"}, {
                        "label": "肃南裕固族自治县",
                        "value": "f1747caa7fba40bfbb83757ed6b6a144"
                    }, {"label": "其他", "value": "2ba694fd44124b0aa469e7d34ff9399b"}],
                    "label": "张掖",
                    "value": "54915158827b431ea13f119f01ccc4a4"
                }, {
                    "children": [{"label": "西峰区", "value": "aa979a0da9984c6cbf15376d28b6be98"}, {
                        "label": "庆城县",
                        "value": "8c623674827040a7bde7eeb9723f8501"
                    }, {"label": "环县", "value": "796296ae4efd47b48cafc1372059bd4e"}, {
                        "label": "华池县",
                        "value": "018c9616b2364c09b6fca71e12322710"
                    }, {"label": "合水县", "value": "b379967057714b4cbcaed7f6672b387f"}, {
                        "label": "正宁县",
                        "value": "0286ad89727349bc948f65eee9458af5"
                    }, {"label": "宁县", "value": "9d6a5cd0bfef4bedaf8eda76f89b0c66"}, {
                        "label": "镇原县",
                        "value": "54ab93e1739c4be6ade8dbdd384646b1"
                    }, {"label": "其他", "value": "8791fbf06745430b9f3674c1341fd3c0"}],
                    "label": "庆阳",
                    "value": "df3822cb47964079ac9d2fbd95595627"
                }, {
                    "children": [{"label": "崆峒区", "value": "d8de1cdc847c4fb289ad7a35a8a84138"}, {
                        "label": "泾川县",
                        "value": "96877ecacd2047768fd8d3d48312ff4c"
                    }, {"label": "灵台县", "value": "cd02ba9ab07c4db1b9a6be3f87a47e74"}, {
                        "label": "崇信县",
                        "value": "c4928725946c4cbaa172d5a60050653c"
                    }, {"label": "华亭县", "value": "a5b04446c83942c2a8eadab78345cf39"}, {
                        "label": "庄浪县",
                        "value": "2268664d1bed4d17b201a96e96e20e80"
                    }, {"label": "静宁县", "value": "847d80e795424039b7143054a387d4fb"}, {
                        "label": "其他",
                        "value": "8aa3f0ae59af483d99a0be60354fac7e"
                    }], "label": "平凉", "value": "1c1291d544f6496e912a44ad71426b42"
                }, {
                    "children": [{"label": "安定区", "value": "9f68a0c77c4148b0b060eada21e71dad"}, {
                        "label": "通渭县",
                        "value": "01a53a293c15425190d14ffb720778f1"
                    }, {"label": "临洮县", "value": "0f662de4a4174c84868dd5b032dc29ed"}, {
                        "label": "漳县",
                        "value": "2060532662fb4d7a9688f07a5fd93172"
                    }, {"label": "岷县", "value": "49a966d2b02c49ccb38b31dded6cf259"}, {
                        "label": "渭源县",
                        "value": "7292da81421a47268bcf28e5dd7ba5b2"
                    }, {"label": "陇西县", "value": "1a8d99640cfc4f8782cb3115b7e0ecad"}, {
                        "label": "其他",
                        "value": "bbdacb43b16043ca9de8344a5feffb5e"
                    }], "label": "定西", "value": "59498be8acd3458abc5ae7e4da3b6e56"
                }, {
                    "children": [{"label": "武都区", "value": "856b6718299c404e862402bbb030ebfb"}, {
                        "label": "成县",
                        "value": "31996be93ecd4346a3afcde96744b27f"
                    }, {"label": "宕昌县", "value": "dd3a148388744a638f6f6814f86d32fc"}, {
                        "label": "康县",
                        "value": "098e57b9ed614c33a3a309eb76d76127"
                    }, {"label": "文县", "value": "df410a9e999b40a5a32f052cbc747fa9"}, {
                        "label": "西和县",
                        "value": "d116e36768d446b5ae7e7b2a166f7723"
                    }, {"label": "礼县", "value": "0c84970b902348318240bafc088e9669"}, {
                        "label": "两当县",
                        "value": "6cbbac912fac40959c72c5d0b282a032"
                    }, {"label": "徽县", "value": "ca4d80d8bcb64bc5bd3606a647bdeba6"}, {
                        "label": "其他",
                        "value": "b0f5ad8fa2ca4d468429b4e646c67549"
                    }], "label": "陇南", "value": "3617c147e9874401a2f90097745848c6"
                }, {
                    "children": [{"label": "临夏市", "value": "3382f028b12d450d87b484381ece6fc6"}, {
                        "label": "临夏县",
                        "value": "0b01643662c94629a42055e8e23343b8"
                    }, {"label": "康乐县", "value": "8f7f2627bd9e447d910e053a06b0f9c5"}, {
                        "label": "永靖县",
                        "value": "c770a8792e1c491ebe0359d6a50dcf6d"
                    }, {"label": "广河县", "value": "3a5e6afe93644e188a6530c224487d3e"}, {
                        "label": "和政县",
                        "value": "9119833fb6044f6d80e4ba37ad68699d"
                    }, {"label": "东乡族自治县", "value": "c0ae413ef68743abb902db903cd78bdc"}, {
                        "label": "积石山保安族东乡族撒拉族自治县",
                        "value": "78f0805f6a6343719141bcac64cba5e1"
                    }, {"label": "其他", "value": "e5e6add192924577a22e1ba1a42de43f"}],
                    "label": "临夏回族自治州",
                    "value": "3daa404c30ff4df0b9169e16fcbcd9ff"
                }, {
                    "children": [{"label": "合作市", "value": "760bf4d3ddf7444897aeffe5c33c0250"}, {
                        "label": "临潭县",
                        "value": "4d23564ab1e94ddda60e55273df24aa7"
                    }, {"label": "卓尼县", "value": "79c8faaff2d24bc48591c5b1817b0e22"}, {
                        "label": "舟曲县",
                        "value": "a355ba9e687547bb989ef0f6c7dfc3c6"
                    }, {"label": "迭部县", "value": "8e2e6b29e15c41e9b1ab1eabc646b73c"}, {
                        "label": "玛曲县",
                        "value": "f525741a7209427d94ca682c50799cbd"
                    }, {"label": "碌曲县", "value": "84f6ae3aa0c04352a362bca6a5a99942"}, {
                        "label": "夏河县",
                        "value": "54b51a423b864ef1a6260d6b5b11479f"
                    }, {"label": "其他", "value": "4efd4be28cb44729bc47884694629b53"}],
                    "label": "甘南藏族自治州",
                    "value": "f59456cdfba9472db40c9b7e38f3f5d4"
                }, {
                    "children": [{"label": "其他", "value": "afa0705aab55400e920f63b94ecb66cf"}],
                    "label": "其他",
                    "value": "abf2ad8d6cae4e4a81cc42c0f0ba1275"
                }], "label": "甘肃", "value": "4bd23b445a83472da9c8c03df895c600"
            }, {
                "children": [{
                    "children": [{
                        "label": "城中区",
                        "value": "610134d863fe48859435b63c391119c0"
                    }, {"label": "城东区", "value": "29400709bdc348d8be0d875ed5f1d0a1"}, {
                        "label": "城西区",
                        "value": "302499a1f53d48438c1f3323af3c74a1"
                    }, {"label": "城北区", "value": "f5cadec05e304087a997ff93f4ca3edd"}, {
                        "label": "湟源县",
                        "value": "c816c6b8bb58441f930db9641d91cfee"
                    }, {"label": "湟中县", "value": "0ab515f31279445696dc4b404d326dc1"}, {
                        "label": "大通回族土族自治县",
                        "value": "160041dfb3484afdaa5409a73e30e1d3"
                    }, {"label": "其他", "value": "1e66fd9e7a364b8d827fb0eeccc89bf2"}],
                    "label": "西宁",
                    "value": "28e8de1a025e4ea486a04b63a2d56f16"
                }, {
                    "children": [{"label": "平安县", "value": "d2e748fd8a414776adcced247173b098"}, {
                        "label": "乐都县",
                        "value": "c5f22af921264d1d9ed24d370332ee5c"
                    }, {"label": "民和回族土族自治县", "value": "e9add2a585174ff480c5e0b924e565f1"}, {
                        "label": "互助土族自治县",
                        "value": "513bd5b3fb904a53ae104abb46b38258"
                    }, {"label": "化隆回族自治县", "value": "e7f3d23ab042431bbe828f1fa329fc91"}, {
                        "label": "循化撒拉族自治县",
                        "value": "d0e8d1255cf24674801b50a02cf52291"
                    }, {"label": "其他", "value": "5588b3e916b049c2b24de82799781522"}],
                    "label": "海东地区",
                    "value": "9304a71e3d8c4bba9ccc0abf24593d0e"
                }, {
                    "children": [{"label": "海晏县", "value": "529b73381cac45b8863608e02615df9a"}, {
                        "label": "祁连县",
                        "value": "44a91b004b224a91bcccf08b45642002"
                    }, {"label": "刚察县", "value": "b9663fabb27a4cb0828166d79dcddab9"}, {
                        "label": "门源回族自治县",
                        "value": "008c0137062d4e3ab5ad15d4ccc75504"
                    }, {"label": "其他", "value": "a4d03cb45e0c42dcb928f67d8f3898d3"}],
                    "label": "海北藏族自治州",
                    "value": "7e443253a07d4c60b2e6b25e3ce282f3"
                }, {
                    "children": [{"label": "共和县", "value": "71c019220f604ec3924e63f3f552c4c5"}, {
                        "label": "同德县",
                        "value": "537a3414795d4029a75f9a3977843263"
                    }, {"label": "贵德县", "value": "2e69270826154b2fa2b70a5e9a88875a"}, {
                        "label": "兴海县",
                        "value": "0f63c1022eeb4078b9d5f8a496a366c0"
                    }, {"label": "贵南县", "value": "dbd176e58d14483798ba733e29630705"}, {
                        "label": "其他",
                        "value": "1c0dafc3565d4bfdbdf39bf829ac8afc"
                    }], "label": "海南藏族自治州", "value": "6e7dac551bd74766af5df95ffba69527"
                }, {
                    "children": [{"label": "同仁县", "value": "fed96fc6bec3461e969b06c3e14778c4"}, {
                        "label": "尖扎县",
                        "value": "2ae3a3385f3f45229e0c07a719e2bd5c"
                    }, {"label": "泽库县", "value": "2185c91b065449849a349a3245a2e17b"}, {
                        "label": "河南蒙古族自治县",
                        "value": "18ff9843ec3d40848f41bd023c2e7d05"
                    }, {"label": "其他", "value": "c63ff890090c41c18e72af5c6b595366"}],
                    "label": "黄南藏族自治州",
                    "value": "4f75edc94bf8459688fb233303dd286a"
                }, {
                    "children": [{"label": "玛沁县", "value": "f8ad7182c2d84367846ca272a8857965"}, {
                        "label": "班玛县",
                        "value": "c31f282389f54e05ad5880f71e666eaa"
                    }, {"label": "甘德县", "value": "43221efbfee64e8abf5f6765509dd34d"}, {
                        "label": "达日县",
                        "value": "4b11cf22aabc4ad48400a0e9f6024ca0"
                    }, {"label": "久治县", "value": "b8db01e4399843e29f05aaa04e0a7cb8"}, {
                        "label": "玛多县",
                        "value": "d1c09ff2baf14e79a82e528abfbd52cd"
                    }, {"label": "其他", "value": "db18857f4d0d4b35b9176925a85c3467"}],
                    "label": "果洛藏族自治州",
                    "value": "4dc58555d18a4184bd6728cfcb01f219"
                }, {
                    "children": [{"label": "玉树县", "value": "837f406548ac44eeb5870f93ea2f49bb"}, {
                        "label": "杂多县",
                        "value": "91b17a06f7ef47a198943151675ae3e0"
                    }, {"label": "称多县", "value": "7bef56ee49244db7b78591744ba6c108"}, {
                        "label": "治多县",
                        "value": "748600c9d02e44869618d587817083e5"
                    }, {"label": "囊谦县", "value": "d4d569f5e9ec488d9c95d1aed4e5ca05"}, {
                        "label": "曲麻莱县",
                        "value": "a867f2e6faad40d2904a6b1657b9253e"
                    }, {"label": "其他", "value": "19ec370001dc49d996d76c91fa1abc4c"}],
                    "label": "玉树藏族自治州",
                    "value": "7556f6ab7e7f4e618dda435f06b79fce"
                }, {
                    "children": [{"label": "德令哈市", "value": "c5f843d2abcb43ca8ef7cf36e9934758"}, {
                        "label": "格尔木市",
                        "value": "b02f3e6a1b2a47048d811e5a5bdf860b"
                    }, {"label": "乌兰县", "value": "4d1dcdad434d43c0bdcd4d013c52d696"}, {
                        "label": "都兰县",
                        "value": "c4e0817a170444efa94a6513a1898683"
                    }, {"label": "天峻县", "value": "3e3376ea63e44567bf9c054383ed9fa2"}, {
                        "label": "其他",
                        "value": "64f6910ef8124a22921c15d62181e95b"
                    }], "label": "海西蒙古族藏族自治州", "value": "41964f2a22d54572ad07d11036444eff"
                }, {
                    "children": [{"label": "其他", "value": "7bd28149482e43c29b288fd136c97177"}],
                    "label": "其他",
                    "value": "ea14345d27914fefb47682f5aa9584ac"
                }], "label": "青海", "value": "20fd7f25dc954332b6523cf662478595"
            }, {
                "children": [{
                    "children": [{
                        "label": "兴庆区",
                        "value": "0ad4164e5f994708930342a1c130b2bb"
                    }, {"label": "西夏区", "value": "a89a66ac8aec4afb82c2f1ba3a92bc7e"}, {
                        "label": "金凤区",
                        "value": "f86e7bdc01cf489c88afeba2c2e54ade"
                    }, {"label": "灵武市", "value": "c2108f3ef14347f09a33d687abbc9932"}, {
                        "label": "永宁县",
                        "value": "2011be51c4754bd687ef8b3d7e930ac9"
                    }, {"label": "贺兰县", "value": "4eac47ffa1aa4a0e976bd9da943ddabf"}, {
                        "label": "其他",
                        "value": "8540616a40684e0bac8d2a5008e1c8d8"
                    }], "label": "银川", "value": "908e1ff5ec50404c89285fbb8b01f2a4"
                }, {
                    "children": [{"label": "大武口区", "value": "456bf6d2378d41909c43e45d7f4e5969"}, {
                        "label": "惠农区",
                        "value": "d8e99388bea94a18856b682233cc6fb4"
                    }, {"label": "平罗县", "value": "e8d656fa840e4479b28d58e096dd640b"}, {
                        "label": "其他",
                        "value": "a870337ba43b4ffabc933b63b8a6e41c"
                    }], "label": "石嘴山", "value": "1e08048f113e462dafe2c517442a50d8"
                }, {
                    "children": [{"label": "利通区", "value": "4c0db29a8fee4b2d953095f881fc1c9c"}, {
                        "label": "青铜峡市",
                        "value": "d7b6a55ada5340909a77bc6941ac7743"
                    }, {"label": "盐池县", "value": "010ba7bb962b4d119234f95e80a15ee4"}, {
                        "label": "同心县",
                        "value": "9d72fcf4f69c446fab37c3ecd0cb7180"
                    }, {"label": "其他", "value": "e66cf3bad9af43d9b9812d967d6f1525"}],
                    "label": "吴忠",
                    "value": "35b8c41fd7f04e7ab1f32271fce2f50c"
                }, {
                    "children": [{"label": "原州区", "value": "146346ae5fb94a1f9f5e357afebefd1d"}, {
                        "label": "西吉县",
                        "value": "aa8fca1f32f74b449b02e9c2f3c7bd5c"
                    }, {"label": "隆德县", "value": "0df0ed8263484cd1b2de8e774fbf5c3e"}, {
                        "label": "泾源县",
                        "value": "6e4171d8045d4e6db4bb077896d47a61"
                    }, {"label": "彭阳县", "value": "f7b36734e891478698f364421428b18f"}, {
                        "label": "其他",
                        "value": "dd4e40a9917a48ea95fba590436a29e1"
                    }], "label": "固原", "value": "3e8f7d20f96247a1963e46ea13e8d785"
                }, {
                    "children": [{"label": "沙坡头区", "value": "590c487913854acd9e9a5ec80ed52cf2"}, {
                        "label": "中宁县",
                        "value": "1141a111d10f49cea06a33457fecbb9b"
                    }, {"label": "海原县", "value": "9becf02012234fcfbe30e1f5185fd1f5"}, {
                        "label": "其他",
                        "value": "d64b463b9ed549c0b36bdc8ddea81d60"
                    }], "label": "中卫", "value": "6b6c243940834229972567416d6fc060"
                }, {
                    "children": [{"label": "其他", "value": "9a74c7cb1ece4a2ea46e1ac810becdc6"}],
                    "label": "其他",
                    "value": "3c59d836f7a0414ca0e065550ea2f533"
                }], "label": "宁夏", "value": "1ec065c5521e47fea42a10a1b806e01d"
            }, {
                "children": [{
                    "children": [{
                        "label": "天山区",
                        "value": "ba21e4822ca343f28609cc5ae48ff8d2"
                    }, {"label": "沙依巴克区", "value": "45189496581749769c2442e989e339ef"}, {
                        "label": "新市区",
                        "value": "b3ff6d86a8404a7fb5de5ef9e1e06acd"
                    }, {"label": "水磨沟区", "value": "b49be3692d404dacb47a6fec560a2910"}, {
                        "label": "头屯河区",
                        "value": "1d51b6e0001e455dab373b434b21a167"
                    }, {"label": "达坂城区", "value": "92570862da014a90adccd5a0a2584998"}, {
                        "label": "东山区",
                        "value": "ad412d9e0571423a92ee3a1cb1d6c9e6"
                    }, {"label": "乌鲁木齐县", "value": "598889e8425b49cb94641dbbfff50c35"}, {
                        "label": "其他",
                        "value": "a9ebecbbe74641bcaaf47c989e3fb362"
                    }], "label": "乌鲁木齐", "value": "c6396dcd62a04ad4b1d40b5845ddcc14"
                }, {
                    "children": [{"label": "克拉玛依区", "value": "c51a56b1c47a4ac3ae059ef46c5500b9"}, {
                        "label": "独山子区",
                        "value": "adc301ecca1c4a0693a6aa2e6a617f0e"
                    }, {"label": "白碱滩区", "value": "30993b0fd96349adbaae4fe21496fc33"}, {
                        "label": "乌尔禾区",
                        "value": "ccd5590c1c42487f8008878b0e9b948a"
                    }, {"label": "其他", "value": "b5c3447abb0e4dd2ac06bd2ac9eadffc"}],
                    "label": "克拉玛依",
                    "value": "c2b5afc2ec8c4bd7b592d3cbb704b5f4"
                }, {
                    "children": [{"label": "吐鲁番市", "value": "6707d59fd81f4d5b92afb4738eeb8b33"}, {
                        "label": "托克逊县",
                        "value": "a800d1420b814060b425a44127a759c3"
                    }, {"label": "鄯善县", "value": "9eb6ad526ab942f3ae3ed00727bc4237"}, {
                        "label": "其他",
                        "value": "2cad1f2f3b4d4cd4a9614f6baa628ff4"
                    }], "label": "吐鲁番地区", "value": "2e4910ea9fe04f33b8765eb2af6308b7"
                }, {
                    "children": [{"label": "哈密市", "value": "c90ca07873e1440198707d41214d8b0b"}, {
                        "label": "伊吾县",
                        "value": "b04d494836f844c3818339d592b4c5ff"
                    }, {"label": "巴里坤哈萨克自治县", "value": "0f7ef5b6fe304327ac6a30ed80a75ce0"}, {
                        "label": "其他",
                        "value": "f05d42f1daa9402b93d94ea4e2c10da2"
                    }], "label": "哈密地区", "value": "33896147f8d74257a67389e5292c7327"
                }, {
                    "children": [{"label": "和田市", "value": "9aee9628f9254034a02e81583377f0be"}, {
                        "label": "和田县",
                        "value": "b4200425d5d642368d7dde41865b1ba1"
                    }, {"label": "洛浦县", "value": "04e54500db91451e83ddecfaadc72dd0"}, {
                        "label": "民丰县",
                        "value": "6deed855e0a641da9961a944600d34e7"
                    }, {"label": "皮山县", "value": "74e8c485423d4b648f1478326334a497"}, {
                        "label": "策勒县",
                        "value": "a8a7678eff3b4c3397c3926bbc20da74"
                    }, {"label": "于田县", "value": "245e0b3894a349659fa364c7cc49fe57"}, {
                        "label": "墨玉县",
                        "value": "27388f53c0e14846ac5939246e38b12e"
                    }, {"label": "其他", "value": "6bc2230b5811434e9e6d5c46c125da8c"}],
                    "label": "和田地区",
                    "value": "bb4a77b40994454fac9d990d690f8e67"
                }, {
                    "children": [{"label": "阿克苏市", "value": "610f4ae94e894037be328a6d5759e4fa"}, {
                        "label": "温宿县",
                        "value": "9cb338847952466aad5e212120027c16"
                    }, {"label": "沙雅县", "value": "3d89773e2a7748f0933c1ae5c42a970c"}, {
                        "label": "拜城县",
                        "value": "f3b424990712444d9595e3d55685cb51"
                    }, {"label": "阿瓦提县", "value": "422f5b94b63b4023b3088bde28a4669d"}, {
                        "label": "库车县",
                        "value": "ca0f18dee65b4672a73ac25df84a1f4e"
                    }, {"label": "柯坪县", "value": "2207edec8d164bf4974c39c1847f8d8a"}, {
                        "label": "新和县",
                        "value": "d288dd9bb1334a24b8c6dc1cc5e0e7f7"
                    }, {"label": "乌什县", "value": "7558e4d40cf0414daee518e8aac166d8"}, {
                        "label": "其他",
                        "value": "44992e0d85004fb0925b41f6a489a148"
                    }], "label": "阿克苏地区", "value": "6623b779bf4349acaf33e4b20578c1e6"
                }, {
                    "children": [{"label": "喀什市", "value": "c50744c0e8ea454abc936c81067e8707"}, {
                        "label": "巴楚县",
                        "value": "4dbcf9bf4fd84c1482106d62f2d9e21a"
                    }, {"label": "泽普县", "value": "dcf8a3ddaca246cba3c8850bb3dd482d"}, {
                        "label": "伽师县",
                        "value": "0aa7957255844e4bbd7743d76897e9c1"
                    }, {"label": "叶城县", "value": "9ef5b4f90a1148fabfe7703c64dde749"}, {
                        "label": "岳普湖县",
                        "value": "76bf4e3470174b9ebec2ee303b5f6ac0"
                    }, {"label": "疏勒县", "value": "eac1147b201942569bd1a1a342009230"}, {
                        "label": "麦盖提县",
                        "value": "fbcb47f3646244f4b8ad439b11c5916e"
                    }, {"label": "英吉沙县", "value": "c03383317f6a421b990751b2d32bbeae"}, {
                        "label": "莎车县",
                        "value": "56c978ecf9f3433f90caf656a7ebdc59"
                    }, {"label": "疏附县", "value": "6a11d182f77a45d7b763b3812cec161c"}, {
                        "label": "塔什库尔干塔吉克自治县",
                        "value": "f312478ffce9414eac06eb5becbeae3d"
                    }, {"label": "其他", "value": "c2083f823c3b4cef8feef24f6ad0421c"}],
                    "label": "喀什地区",
                    "value": "15852037a8084fa7b2a9c0757a9722b2"
                }, {
                    "children": [{"label": "阿图什市", "value": "ee352fa75c0a4e2e95d47aadfa0d80a2"}, {
                        "label": "阿合奇县",
                        "value": "9cff6b2f9143484a9b452282cc3c1b5e"
                    }, {"label": "乌恰县", "value": "4db32f9b8a6141cf9a3b989580fa37c8"}, {
                        "label": "阿克陶县",
                        "value": "8af52cbe839c454b94e5a0c46d53cbea"
                    }, {"label": "其他", "value": "8b13ceb19c5b487ca5845338639ccb3c"}],
                    "label": "克孜勒苏柯尔克孜自治州",
                    "value": "1148a6c780c849f7b59fd0ea387e14cf"
                }, {
                    "children": [{"label": "库尔勒市", "value": "10e4ae6a0ebd4919bc45bb4f1ea28681"}, {
                        "label": "和静县",
                        "value": "4bc2b392fecf4a40b6fa08caaaf6c403"
                    }, {"label": "尉犁县", "value": "3e317f3e1e4e4168b9389ebec8468228"}, {
                        "label": "和硕县",
                        "value": "6c5cab35f1e5485a99e457ba3990fb92"
                    }, {"label": "且末县", "value": "43f4213fc75f4f7488b69f3f5e3058dc"}, {
                        "label": "博湖县",
                        "value": "b15b79d70ffb4469821b49de61232866"
                    }, {"label": "轮台县", "value": "54e5770733154f84a9ac8bf376b98f2f"}, {
                        "label": "若羌县",
                        "value": "7ccc6fa99ef6493db846dfc63e91fabc"
                    }, {"label": "焉耆回族自治县", "value": "f7ba7b5f563d4026a8626d1e2c910c50"}, {
                        "label": "其他",
                        "value": "7b8e581e229e40099c6d29ff291de200"
                    }], "label": "巴音郭楞蒙古自治州", "value": "6df9b8af1b044b61a96f2f684c447f63"
                }, {
                    "children": [{"label": "昌吉市", "value": "e1f3b4b59a98431591684304bf4549f8"}, {
                        "label": "阜康市",
                        "value": "3d8932267c2a4929bea196ba24fdadda"
                    }, {"label": "奇台县", "value": "dbece980fc6741dd84bce42b749a53db"}, {
                        "label": "玛纳斯县",
                        "value": "6caa1bfd0f0f49e693ce71884cb6a525"
                    }, {"label": "吉木萨尔县", "value": "96e526f1979e44978634880a69f36aff"}, {
                        "label": "呼图壁县",
                        "value": "6252694e1e554f60a3f03b67e8a1cb25"
                    }, {"label": "木垒哈萨克自治县", "value": "8ee4a56af5164ed79c67462af131204e"}, {
                        "label": "米泉市",
                        "value": "da688d18cb094222b619d3f0bad69079"
                    }, {"label": "其他", "value": "7884f228e14548e582e0f7b7f65230ae"}],
                    "label": "昌吉回族自治州",
                    "value": "1f180ed690cf49479d28219da00c0bbb"
                }, {
                    "children": [{"label": "博乐市", "value": "96a6932bd507467db83fd4bb5e8e4ad1"}, {
                        "label": "精河县",
                        "value": "ccda9d63b2d247e4a5814a8fd2ab4d95"
                    }, {"label": "温泉县", "value": "8dd9c1b1e2784153b307c729ab805818"}, {
                        "label": "其他",
                        "value": "81f714460bcf4acbb4e25b93c035acad"
                    }], "label": "博尔塔拉蒙古自治州", "value": "9c193994ac2c40e09751c40eb314e3fa"
                }, {
                    "children": [{"label": "石河子", "value": "76a3068d28904f8ba4d8aef55f1332c1"}],
                    "label": "石河子",
                    "value": "2abe7ce842d64afca581b7e34858cce0"
                }, {
                    "children": [{"label": "阿拉尔", "value": "f66622c660b44c82b105e83c28316802"}],
                    "label": "阿拉尔",
                    "value": "9c19817c57954e28a430fb4e3736f0c8"
                }, {
                    "children": [{"label": "图木舒克", "value": "0338c594c5474086adea293eb33be116"}],
                    "label": "图木舒克",
                    "value": "3595488a3fd14aae8765c23e873f605a"
                }, {
                    "children": [{"label": "五家渠", "value": "d5fbae595a04488ab4634d2cb23abdbe"}],
                    "label": "五家渠",
                    "value": "a83035e83a654a259e1262a2e11c60dc"
                }, {
                    "children": [{"label": "伊宁市", "value": "9b055b0aef3c4b1aa154844ee70b66e8"}, {
                        "label": "奎屯市",
                        "value": "54b8e5cf36594661922f679f9ca5b4bf"
                    }, {"label": "伊宁县", "value": "8db2c8bf04a14f1a8c8ed4002790ac67"}, {
                        "label": "特克斯县",
                        "value": "1e0aba704d294320b765cb4d190a4336"
                    }, {"label": "尼勒克县", "value": "80a42ce12f3b4e58bed85562812be059"}, {
                        "label": "昭苏县",
                        "value": "d5647b2d4c154818b5886011ef1f8d2f"
                    }, {"label": "新源县", "value": "64b44aeff3ed4e5c9210056b4ee32cd1"}, {
                        "label": "霍城县",
                        "value": "f1f9f83b68084a398b51f59a64fa0284"
                    }, {"label": "巩留县", "value": "0beb9bd2761c4790bf98611af558fdf5"}, {
                        "label": "察布查尔锡伯自治县",
                        "value": "ad5860427995493286e411431a60db58"
                    }, {"label": "塔城地区", "value": "eb8a5f1b82d84b9ebb9ff8a279dbfef0"}, {
                        "label": "阿勒泰地区",
                        "value": "c889492f063e47f89f145e347513b18c"
                    }, {"label": "其他", "value": "e039b05c39604bfabb8008047517fab0"}],
                    "label": "伊犁哈萨克自治州",
                    "value": "456ed391c6344799ab7da2323801a662"
                }, {
                    "children": [{"label": "其他", "value": "2089a8b759cd4ce9afd9a27827f43bb0"}],
                    "label": "其他",
                    "value": "c583f1c4dad1416d95e6e47601f7cb53"
                }], "label": "新疆", "value": "4c365d28f7ec46e083a057611c8ac20d"
            }, {
                "children": [{
                    "children": [{
                        "label": "台北市",
                        "value": "1832cfd9dac14a8ca3e41b4ff4ea608a"
                    }, {"label": "高雄市", "value": "87ff425e70d948d2a21cd141ce373e25"}, {
                        "label": "台北县",
                        "value": "f765e5433e3742dd82c4922bd03bafde"
                    }, {"label": "桃园县", "value": "31a4dd5d061146e383c92003af9e90a6"}, {
                        "label": "新竹县",
                        "value": "0989b4fe2e8148c79780ac63d5e95962"
                    }, {"label": "苗栗县", "value": "7c8445b49f404cebb7f70c561f146eb0"}, {
                        "label": "台中县",
                        "value": "b5f81649bf194846a8bd7106e56d687d"
                    }, {"label": "彰化县", "value": "afde3847939641ab97c6c1e91567c0a0"}, {
                        "label": "南投县",
                        "value": "2a58db7bff8b478ea2724c511071c25a"
                    }, {"label": "云林县", "value": "d70593ac7d5f486f9f9081f2a14873b6"}, {
                        "label": "嘉义县",
                        "value": "2e9edb4f5ec049008e40e9777785c2a4"
                    }, {"label": "台南县", "value": "efeb03cc75604cde8896e695011ea7c3"}, {
                        "label": "高雄县",
                        "value": "c558a8ca5b364795be1efaef37194abc"
                    }, {"label": "屏东县", "value": "e6eeb8177efb47f085e933dc4694ff3b"}, {
                        "label": "宜兰县",
                        "value": "e19ef957c4e548339f5358b105b98806"
                    }, {"label": "花莲县", "value": "61ffc0f480e6465dacf3be3df0a90f80"}, {
                        "label": "台东县",
                        "value": "5d21f60581aa4816b0870bf1ad9fcb00"
                    }, {"label": "澎湖县", "value": "c3ea8c1f5ba94d10aeb9e4b399f540e8"}, {
                        "label": "基隆市",
                        "value": "4ca9666608de4f1bbed024ed403d7c51"
                    }, {"label": "新竹市", "value": "f812ab65be9b40ce909f91d0f34b8714"}, {
                        "label": "台中市",
                        "value": "33e1ad02f2e7401a8105505aab26a012"
                    }, {"label": "嘉义市", "value": "a7848a5d42a94112b252e3f6c8ebbe8f"}, {
                        "label": "台南市",
                        "value": "0dc7cb24ddb94e5e8278570014b8955e"
                    }, {"label": "其他", "value": "d0523399f64e4ddc85d603b57ac5f39c"}],
                    "label": "台湾",
                    "value": "809ad56842a04ec69f5dc1b2f17f60a3"
                }, {
                    "children": [{"label": "其他", "value": "e9a08705a12246c9ac79bff0f9db0df9"}],
                    "label": "其他",
                    "value": "b1f6d98e3bd84195b34785eef79f604d"
                }], "label": "台湾", "value": "731d1e57bdc04154a3546deddb70ebe3"
            }, {
                "children": [{
                    "children": [{
                        "label": "花地玛堂区",
                        "value": "08d95d743dc946a28d4c836d7a112f40"
                    }, {"label": "圣安多尼堂区", "value": "a3eeed36148b49f684c5d9b79203658d"}, {
                        "label": "大堂区",
                        "value": "be7cdc29e3df4a0a831cd83b89a0697e"
                    }, {"label": "望德堂区", "value": "3581a9563d7d4f418683c4dadb6cb0fe"}, {
                        "label": "风顺堂区",
                        "value": "f47cea22a1994939ac70e96a378db94a"
                    }, {"label": "嘉模堂区", "value": "f4a4d596301d4081884b9db6a8b1b3c1"}, {
                        "label": "圣方济各堂区",
                        "value": "628de793ae564fe7a96f7561712cf905"
                    }, {"label": "路凼", "value": "4e1cedbc5b39450eb2c61f328434fc3f"}, {
                        "label": "其他",
                        "value": "800c0bc0459d4b32b38514fd104f0351"
                    }], "label": "澳门", "value": "d1675ab4aaea4c889d462d3cf4d49d6a"
                }], "label": "澳门", "value": "daa15dc1e3a346ffb304f9e0eb28a185"
            }, {
                "children": [{
                    "children": [{
                        "label": "中西区",
                        "value": "d1bc3c431120475c9f418c83110f4056"
                    }, {"label": "湾仔区", "value": "6842009a628e4011b6eabff3cd5d4371"}, {
                        "label": "东区",
                        "value": "c3bbee0866c6477cbe55df77c4d2e33a"
                    }, {"label": "南区", "value": "f5a5ddacfd5b4b98a4ebcb1f1b28d6a1"}, {
                        "label": "深水埗区",
                        "value": "f2449a3512ce4a81a226dc041cc1869f"
                    }, {"label": "油尖旺区", "value": "54b966c04fb14db19f6b0268c1924dc4"}, {
                        "label": "九龙城区",
                        "value": "08246331f6c9425e8ad687f19fe1bacc"
                    }, {"label": "黄大仙区", "value": "4c767563c9314299a1dd9d6e6dc8c03d"}, {
                        "label": "观塘区",
                        "value": "51dd4ba80568499aac60e66606a616f2"
                    }, {"label": "北区", "value": "a6659a131195487fac659bb85993f6a4"}, {
                        "label": "大埔区",
                        "value": "b2ec875bb63340ebb61e7773ff33daf6"
                    }, {"label": "沙田区", "value": "5db9df10a42f457cb19d81b248195083"}, {
                        "label": "西贡区",
                        "value": "5b5a18053c0e4f729f25af22ea23d40c"
                    }, {"label": "元朗区", "value": "0d15e49b95584cfebc43a0bad0d91c10"}, {
                        "label": "屯门区",
                        "value": "4d9f7090744746658b9b2d305e999feb"
                    }, {"label": "荃湾区", "value": "cb42865757ce41168b399a97cd7b739a"}, {
                        "label": "葵青区",
                        "value": "1cad4626ccb14a9eb62d889f61f276a6"
                    }, {"label": "离岛区", "value": "bcc6ee8a165c4753a7faac53ff5011b0"}, {
                        "label": "其他",
                        "value": "4473b41d5c894f6386a2ef971b04c833"
                    }], "label": "香港", "value": "0c1a5ca087954e3998ccf7ebc2c7ea39"
                }], "label": "香港", "value": "cdd2ce81e7b64044a869a890c39740ca"
            }, {
                "children": [{
                    "children": [{"label": "钓鱼岛", "value": "48e3f4b381fc4d01b3f434c760e7c531"}],
                    "label": "钓鱼岛",
                    "value": "991f8fb8fcd24dedbaf74b0af5b5973a"
                }], "label": "钓鱼岛", "value": "807f21bede334bf6a69425f5d3051c1e"
            }]
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    handleLoad() {
        http({
            url: '/delivery/list',
            data: {
                page_index: 1,
                page_size: 10
            },
            success: function (json) {

            }.bind(this),
            complete: function () {

            }.bind(this)
        }).post();
    }

    handleLeftClick() {
        this.props.dispatch(routerRedux.goBack());
    }

    handleSubmit() {
        this.props.form.validateFields((errors, values) => {
            if (!errors) {
                if (!validate.isPhone(values.delivery_phone)) {
                    Toast.fail('手机号码格式不对');

                    return;
                }

                if (values.delivery_province_city_area.length == 0) {
                    Toast.fail('请选择省市区');

                    return;
                }

                values.delivery_province = values.delivery_province_city_area[0];
                values.delivery_city = values.delivery_province_city_area[1];
                values.delivery_area = values.delivery_province_city_area[2];

                values.delivery_address = delivery_province_city_area[0] + delivery_province_city_area[1] + delivery_province_city_area[2] + values.delivery_street;

                http({
                    url: '/delivery/save',
                    data: values,
                    success: function (json) {
                        Toast.success('保存成功');

                        setTimeout(function () {
                            this.props.dispatch(routerRedux.push({
                                pathname: '/home',
                                query: {}
                            }));
                        }.bind(this), constant.timeout * 300);
                    }.bind(this),
                    complete: function () {

                    }.bind(this)
                }).post();
            }
        });
    }

    handlePickerForma(values) {
        delivery_province_city_area = values;

        console.log(values);
    }

    render() {
        const {getFieldProps, getFieldError} = this.props.form;

        return (
            <div>
                <NavBar className={style.header} mode="dark" leftContent="返回"
                        onLeftClick={this.handleLeftClick.bind(this)}>快递地址</NavBar>
                <div className={style.page}>
                    <WhiteSpace size="lg"/>
                    <List>
                        <InputItem
                            {...getFieldProps('delivery_name', {
                                rules: [{
                                    required: true,
                                    message: '请输入收货人'
                                }],
                                initialValue: ''
                            })}
                            error={!!getFieldError('delivery_name')}
                            clear
                            placeholder="请输入收货人"
                        >收货人</InputItem>
                        <InputItem
                            {...getFieldProps('delivery_phone', {
                                rules: [{
                                    required: true,
                                    message: '请输入手机号码'
                                }],
                                initialValue: ''
                            })}
                            error={!!getFieldError('delivery_phone')}
                            clear
                            placeholder="请输入手机号码"
                        >手机号码</InputItem>
                        <Picker data={this.state.china} {...getFieldProps('delivery_province_city_area', {
                            initialValue: []
                        })}
                                format={this.handlePickerForma.bind(this)}
                        >
                            <List.Item arrow="horizontal">省市区</List.Item>
                        </Picker>
                        <InputItem
                            {...getFieldProps('delivery_street', {
                                rules: [{
                                    required: true,
                                    message: '请输入详细地址'
                                }],
                                initialValue: ''
                            })}
                            error={!!getFieldError('delivery_street')}
                            clear
                            placeholder="请输入详细地址"
                        >详细地址</InputItem>
                        <List.Item
                            extra={<Switch
                                {...getFieldProps('delivery_is_default', {
                                    valuePropName: 'checked',
                                    initialValue: true
                                })}
                            />}
                        >设为默认地址</List.Item>
                    </List>
                    <div style={{margin: '50px 10px 0px 10px'}}>
                        <Button type="primary" onClick={this.handleSubmit.bind(this)}>保存</Button>
                    </div>
                </div>
            </div>
        );
    }
}

DeliveryDetail.propTypes = {};

DeliveryDetail = createForm()(DeliveryDetail);

export default connect(({}) => ({}))(DeliveryDetail);
