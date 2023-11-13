
        function _base64ToArrayBuffer(base64) {
            var binary_string = window.atob(base64);
            var len = binary_string.length;
            var bytes = new Uint8Array(len);
            for (var i = 0; i < len; i++) {
                bytes[i] = binary_string.charCodeAt(i);
            }
            return bytes.buffer;
        }

        function _arrayBufferToBase64( buffer ) {
          var binary = '';
          var bytes = new Uint8Array( buffer );
          var len = bytes.byteLength;
          for (var i = 0; i < len; i++) {
             binary += String.fromCharCode( bytes[ i ] );
          }
          return window.btoa( binary );
        }

        document.addEventListener("DOMContentLoaded", function() {
            var old_prefilter = jQuery.htmlPrefilter;

            jQuery.htmlPrefilter = function(v) {
            
                var regs = [
                    /<a[^>]*href="(?<url>[^"]*)"[^>]*>/gi,
                    /<img[^>]*src="(?<url>[^"]*)"\/?>/gi,
                    /<source[^>]*src="(?<url>[^"]*)"/gi
                ];
                
                var replaces = {};

                for (i in regs)
                {
                    reg = regs[i];

                    var m = true;
                    var n = 0;
                    while (m && n < 100)
                    {
                        n += 1;
                        
                        m = reg.exec(v);
                        if (m)
                        {
                            if (m['groups'] && m['groups']['url'])
                            {
                                var url = m['groups']['url'];
                                if (server_data.hasOwnProperty(url))
                                {
                                    console.log(`Added url:${url} to be replaced with data of ${server_data[url].length} bytes length`);
                                    replaces[url] = server_data[url];                                    
                                }
                            }
                        }
                    }
                }
                
                for (let src in replaces)
                {
                    let dest = replaces[src];
                    v = v.replace(src, dest);
                }

                return old_prefilter(v);
            };
        });

        var server_data={
 "data/behaviors.csv": "\"Epic\",\"Feature\",\"Story\",\"FAILED\",\"BROKEN\",\"PASSED\",\"SKIPPED\",\"UNKNOWN\"\n\"\",\"\",\"\",\"1\",\"0\",\"0\",\"0\",\"0\"\n\"\",\"S3 Tests\",\"Check File Presence\",\"0\",\"1\",\"0\",\"0\",\"0\"\n", 
 "data/behaviors.json": "{\"uid\":\"b1a8273437954620fa374b796ffaacdd\",\"name\":\"behaviors\",\"children\":[{\"name\":\"test_s3_file_present\",\"uid\":\"41dbac6add42603\",\"parentUid\":\"b1a8273437954620fa374b796ffaacdd\",\"status\":\"failed\",\"time\":{\"start\":1697550445150,\"stop\":1697550445489,\"duration\":339},\"flaky\":false,\"newFailed\":false,\"newPassed\":false,\"newBroken\":false,\"retriesCount\":0,\"retriesStatusChange\":false,\"parameters\":[],\"tags\":[]},{\"name\":\"S3 Tests\",\"children\":[{\"name\":\"Check File Presence\",\"children\":[{\"name\":\"test_s3_file_present\",\"uid\":\"6de6652d2e2bbd6e\",\"parentUid\":\"3498fb42d471d2952e14a4a540b7e44a\",\"status\":\"broken\",\"time\":{\"start\":1697550445844,\"stop\":1697550445844,\"duration\":0},\"flaky\":false,\"newFailed\":false,\"newPassed\":false,\"newBroken\":false,\"retriesCount\":0,\"retriesStatusChange\":false,\"parameters\":[],\"tags\":[]}],\"uid\":\"3498fb42d471d2952e14a4a540b7e44a\"}],\"uid\":\"f786dfba63b6cf0e6ebf3934d53dcd53\"}]}", 
 "data/categories.csv": "\"Category\",\"FAILED\",\"BROKEN\",\"PASSED\",\"SKIPPED\",\"UNKNOWN\"\n\"Product defects\",\"1\",\"0\",\"0\",\"0\",\"0\"\n\"Test defects\",\"0\",\"1\",\"0\",\"0\",\"0\"\n", 
 "data/categories.json": "{\"uid\":\"4b4757e66a1912dae1a509f688f20b0f\",\"name\":\"categories\",\"children\":[{\"name\":\"Product defects\",\"children\":[{\"name\":\"FileNotFoundError: [Errno 2] No such file or directory: 'terraform_outputs.json'\",\"children\":[{\"name\":\"test_s3_file_present\",\"uid\":\"41dbac6add42603\",\"parentUid\":\"6a8636c5cdaae74cd496283ab9cdc15f\",\"status\":\"failed\",\"time\":{\"start\":1697550445150,\"stop\":1697550445489,\"duration\":339},\"flaky\":false,\"newFailed\":false,\"newPassed\":false,\"newBroken\":false,\"retriesCount\":0,\"retriesStatusChange\":false,\"parameters\":[],\"tags\":[]}],\"uid\":\"6a8636c5cdaae74cd496283ab9cdc15f\"}],\"uid\":\"8fb3a91ba5aaf9de24cc8a92edc82b5d\"},{\"name\":\"Test defects\",\"children\":[{\"name\":\"FileNotFoundError: [Errno 2] No such file or directory: 'terraform_outputs.json'\",\"children\":[{\"name\":\"test_s3_file_present\",\"uid\":\"6de6652d2e2bbd6e\",\"parentUid\":\"871d2485de9c79bcda19c50ab94bf01f\",\"status\":\"broken\",\"time\":{\"start\":1697550445844,\"stop\":1697550445844,\"duration\":0},\"flaky\":false,\"newFailed\":false,\"newPassed\":false,\"newBroken\":false,\"retriesCount\":0,\"retriesStatusChange\":false,\"parameters\":[],\"tags\":[]}],\"uid\":\"871d2485de9c79bcda19c50ab94bf01f\"}],\"uid\":\"bdbf199525818fae7a8651db9eafe741\"}]}", 
 "data/packages.json": "{\"uid\":\"83edc06c07f9ae9e47eb6dd1b683e4e2\",\"name\":\"packages\",\"children\":[{\"name\":\"allure_pytest_test\",\"children\":[{\"name\":\"test_s3_file_present\",\"uid\":\"41dbac6add42603\",\"parentUid\":\"fa76b3771aecb873651f4241d3126a79\",\"status\":\"failed\",\"time\":{\"start\":1697550445150,\"stop\":1697550445489,\"duration\":339},\"flaky\":false,\"newFailed\":false,\"newPassed\":false,\"newBroken\":false,\"retriesCount\":0,\"retriesStatusChange\":false,\"parameters\":[],\"tags\":[]},{\"name\":\"test_s3_file_present\",\"uid\":\"6de6652d2e2bbd6e\",\"parentUid\":\"fa76b3771aecb873651f4241d3126a79\",\"status\":\"broken\",\"time\":{\"start\":1697550445844,\"stop\":1697550445844,\"duration\":0},\"flaky\":false,\"newFailed\":false,\"newPassed\":false,\"newBroken\":false,\"retriesCount\":0,\"retriesStatusChange\":false,\"parameters\":[],\"tags\":[]}],\"uid\":\"fa76b3771aecb873651f4241d3126a79\"}]}", 
 "data/suites.csv": "\"Status\",\"Start Time\",\"Stop Time\",\"Duration in ms\",\"Parent Suite\",\"Suite\",\"Sub Suite\",\"Test Class\",\"Test Method\",\"Name\",\"Description\"\n\"failed\",\"Tue Oct 17 15:47:25 CEST 2023\",\"Tue Oct 17 15:47:25 CEST 2023\",\"339\",\"\",\"pytest\",\"\",\"allure_pytest_test\",\"\",\"test_s3_file_present\",\"\"\n\"broken\",\"Tue Oct 17 15:47:25 CEST 2023\",\"Tue Oct 17 15:47:25 CEST 2023\",\"0\",\"\",\"allure_pytest_test\",\"\",\"\",\"\",\"test_s3_file_present\",\"\"\n", 
 "data/suites.json": "{\"uid\":\"98d3104e051c652961429bf95fa0b5d6\",\"name\":\"suites\",\"children\":[{\"name\":\"pytest\",\"children\":[{\"name\":\"test_s3_file_present\",\"uid\":\"41dbac6add42603\",\"parentUid\":\"1391e8d00208145d2c262e76f0a53c75\",\"status\":\"failed\",\"time\":{\"start\":1697550445150,\"stop\":1697550445489,\"duration\":339},\"flaky\":false,\"newFailed\":false,\"newPassed\":false,\"newBroken\":false,\"retriesCount\":0,\"retriesStatusChange\":false,\"parameters\":[],\"tags\":[]}],\"uid\":\"1391e8d00208145d2c262e76f0a53c75\"},{\"name\":\"allure_pytest_test\",\"children\":[{\"name\":\"test_s3_file_present\",\"uid\":\"6de6652d2e2bbd6e\",\"parentUid\":\"149784927e2f940c18a420e9e053e5fb\",\"status\":\"broken\",\"time\":{\"start\":1697550445844,\"stop\":1697550445844,\"duration\":0},\"flaky\":false,\"newFailed\":false,\"newPassed\":false,\"newBroken\":false,\"retriesCount\":0,\"retriesStatusChange\":false,\"parameters\":[],\"tags\":[]}],\"uid\":\"149784927e2f940c18a420e9e053e5fb\"}]}", 
 "data/timeline.json": "{\"uid\":\"ab17fc5a4eb3bca4b216b548c7f9fcbc\",\"name\":\"timeline\",\"children\":[{\"name\":\"WKS0002834571\",\"children\":[{\"name\":\"28372-MainThread\",\"children\":[{\"name\":\"test_s3_file_present\",\"uid\":\"6de6652d2e2bbd6e\",\"parentUid\":\"ba8cf4009a70f82714c204beb00ae13f\",\"status\":\"broken\",\"time\":{\"start\":1697550445844,\"stop\":1697550445844,\"duration\":0},\"flaky\":false,\"newFailed\":false,\"newPassed\":false,\"newBroken\":false,\"retriesCount\":0,\"retriesStatusChange\":false,\"parameters\":[],\"tags\":[]}],\"uid\":\"ba8cf4009a70f82714c204beb00ae13f\"},{\"name\":\"test_s3_file_present\",\"uid\":\"41dbac6add42603\",\"parentUid\":\"9a3857f6d87db06fc343e64a41d93be1\",\"status\":\"failed\",\"time\":{\"start\":1697550445150,\"stop\":1697550445489,\"duration\":339},\"flaky\":false,\"newFailed\":false,\"newPassed\":false,\"newBroken\":false,\"retriesCount\":0,\"retriesStatusChange\":false,\"parameters\":[],\"tags\":[]}],\"uid\":\"9a3857f6d87db06fc343e64a41d93be1\"}]}", 
 "data/test-cases/41dbac6add42603.json": "{\"uid\":\"41dbac6add42603\",\"name\":\"test_s3_file_present\",\"historyId\":\"pytest:allure_pytest_test#test_s3_file_present\",\"time\":{\"start\":1697550445150,\"stop\":1697550445489,\"duration\":339},\"status\":\"failed\",\"statusMessage\":\"FileNotFoundError: [Errno 2] No such file or directory: 'terraform_outputs.json'\",\"statusTrace\":\"s3_client = &lt;botocore.client.S3 object at 0x000001A1845807C0&gt;\\n\\n    @allure.feature(\\\"S3 Tests\\\")\\n    @allure.story(\\\"Check File Presence\\\")\\n    def test_s3_file_present(s3_client):\\n    \\n&gt;       outputs_tf = get_terraform_outputs()\\n\\nallure_pytest_test.py:36: \\n_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ \\n\\n    def get_terraform_outputs():\\n&gt;       with open('terraform_outputs.json') as file:\\nE       FileNotFoundError: [Errno 2] No such file or directory: 'terraform_outputs.json'\\n\\nallure_pytest_test.py:8: FileNotFoundError\",\"flaky\":false,\"newFailed\":false,\"newBroken\":false,\"newPassed\":false,\"retriesCount\":0,\"retriesStatusChange\":false,\"beforeStages\":[],\"testStage\":{\"steps\":[],\"attachments\":[],\"parameters\":[],\"shouldDisplayMessage\":false,\"attachmentsCount\":0,\"stepsCount\":0,\"hasContent\":false},\"afterStages\":[],\"labels\":[{\"name\":\"resultFormat\",\"value\":\"junit\"},{\"name\":\"suite\",\"value\":\"pytest\"},{\"name\":\"host\",\"value\":\"WKS0002834571\"},{\"name\":\"testClass\",\"value\":\"allure_pytest_test\"},{\"name\":\"package\",\"value\":\"allure_pytest_test\"}],\"parameters\":[],\"links\":[],\"hidden\":false,\"retry\":false,\"extra\":{\"severity\":\"normal\",\"retries\":[],\"categories\":[{\"name\":\"Product defects\",\"matchedStatuses\":[],\"flaky\":false}],\"tags\":[]},\"source\":\"41dbac6add42603.json\",\"parameterValues\":[]}", 
 "data/test-cases/6de6652d2e2bbd6e.json": "{\"uid\":\"6de6652d2e2bbd6e\",\"name\":\"test_s3_file_present\",\"fullName\":\"allure_pytest_test#test_s3_file_present\",\"historyId\":\"73490472b191f2c9b472859154f6921b\",\"time\":{\"start\":1697550445844,\"stop\":1697550445844,\"duration\":0},\"status\":\"broken\",\"statusMessage\":\"FileNotFoundError: [Errno 2] No such file or directory: 'terraform_outputs.json'\",\"statusTrace\":\"s3_client = &lt;botocore.client.S3 object at 0x000001A1845807C0&gt;\\n\\n    @allure.feature(\\\"S3 Tests\\\")\\n    @allure.story(\\\"Check File Presence\\\")\\n    def test_s3_file_present(s3_client):\\n    \\n&gt;       outputs_tf = get_terraform_outputs()\\n\\nallure_pytest_test.py:36: \\n_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ \\n\\n    def get_terraform_outputs():\\n&gt;       with open('terraform_outputs.json') as file:\\nE       FileNotFoundError: [Errno 2] No such file or directory: 'terraform_outputs.json'\\n\\nallure_pytest_test.py:8: FileNotFoundError\",\"flaky\":false,\"newFailed\":false,\"newBroken\":false,\"newPassed\":false,\"retriesCount\":0,\"retriesStatusChange\":false,\"beforeStages\":[{\"name\":\"_session_faker\",\"time\":{\"start\":1697550445508,\"stop\":1697550445575,\"duration\":67},\"status\":\"passed\",\"steps\":[],\"attachments\":[],\"parameters\":[],\"shouldDisplayMessage\":false,\"attachmentsCount\":0,\"stepsCount\":0,\"hasContent\":false},{\"name\":\"s3_client\",\"time\":{\"start\":1697550445575,\"stop\":1697550445843,\"duration\":268},\"status\":\"passed\",\"steps\":[],\"attachments\":[],\"parameters\":[],\"shouldDisplayMessage\":false,\"attachmentsCount\":0,\"stepsCount\":0,\"hasContent\":false}],\"afterStages\":[],\"labels\":[{\"name\":\"feature\",\"value\":\"S3 Tests\"},{\"name\":\"story\",\"value\":\"Check File Presence\"},{\"name\":\"suite\",\"value\":\"allure_pytest_test\"},{\"name\":\"host\",\"value\":\"WKS0002834571\"},{\"name\":\"thread\",\"value\":\"28372-MainThread\"},{\"name\":\"framework\",\"value\":\"pytest\"},{\"name\":\"language\",\"value\":\"cpython3\"},{\"name\":\"package\",\"value\":\"allure_pytest_test\"},{\"name\":\"resultFormat\",\"value\":\"allure2\"}],\"parameters\":[],\"links\":[],\"hidden\":false,\"retry\":false,\"extra\":{\"severity\":\"normal\",\"retries\":[],\"categories\":[{\"name\":\"Test defects\",\"matchedStatuses\":[],\"flaky\":false}],\"tags\":[]},\"source\":\"6de6652d2e2bbd6e.json\",\"parameterValues\":[]}", 
 "export/influxDbData.txt": "launch_status failed=1 1697550530000000000\nlaunch_status broken=1 1697550530000000000\nlaunch_status passed=0 1697550530000000000\nlaunch_status skipped=0 1697550530000000000\nlaunch_status unknown=0 1697550530000000000\nlaunch_time duration=694 1697550530000000000\nlaunch_time min_duration=0 1697550530000000000\nlaunch_time max_duration=339 1697550530000000000\nlaunch_time sum_duration=339 1697550530000000000\nlaunch_problems product_defects=1 1697550530000000000\nlaunch_problems test_defects=1 1697550530000000000\nlaunch_retries retries=0 1697550530000000000\nlaunch_retries run=2 1697550530000000000\n", 
 "export/mail.html": "data:text/html;base64, PCFET0NUWVBFIGh0bWw+CjxodG1sPgo8aGVhZD4KICAgIDxtZXRhIGNoYXJzZXQ9InV0Zi04Ij4KICAgIDx0aXRsZT5BbGx1cmUgUmVwb3J0IHN1bW1hcnkgbWFpbDwvdGl0bGU+CjwvaGVhZD4KPGJvZHk+CiAgICBNYWlsIGJvZHkKPC9ib2R5Pgo8L2h0bWw+Cg==", 
 "export/prometheusData.txt": "launch_status_failed 1\nlaunch_status_broken 1\nlaunch_status_passed 0\nlaunch_status_skipped 0\nlaunch_status_unknown 0\nlaunch_time_duration 694\nlaunch_time_min_duration 0\nlaunch_time_max_duration 339\nlaunch_time_sum_duration 339\nlaunch_problems_product_defects 1\nlaunch_problems_test_defects 1\nlaunch_retries_retries 0\nlaunch_retries_run 2\n", 
 "history/categories-trend.json": "[{\"data\":{\"Product defects\":1,\"Test defects\":1}}]", 
 "history/duration-trend.json": "[{\"data\":{\"duration\":694}}]", 
 "history/history-trend.json": "[{\"data\":{\"failed\":1,\"broken\":1,\"skipped\":0,\"passed\":0,\"unknown\":0,\"total\":2}}]", 
 "history/history.json": "{\"pytest:allure_pytest_test#test_s3_file_present\":{\"statistic\":{\"failed\":1,\"broken\":0,\"skipped\":0,\"passed\":0,\"unknown\":0,\"total\":1},\"items\":[{\"uid\":\"41dbac6add42603\",\"status\":\"failed\",\"statusDetails\":\"FileNotFoundError: [Errno 2] No such file or directory: 'terraform_outputs.json'\",\"time\":{\"start\":1697550445150,\"stop\":1697550445489,\"duration\":339}}]},\"73490472b191f2c9b472859154f6921b\":{\"statistic\":{\"failed\":0,\"broken\":1,\"skipped\":0,\"passed\":0,\"unknown\":0,\"total\":1},\"items\":[{\"uid\":\"6de6652d2e2bbd6e\",\"status\":\"broken\",\"statusDetails\":\"FileNotFoundError: [Errno 2] No such file or directory: 'terraform_outputs.json'\",\"time\":{\"start\":1697550445844,\"stop\":1697550445844,\"duration\":0}}]}}", 
 "history/retry-trend.json": "[{\"data\":{\"run\":2,\"retry\":0}}]", 
 "plugin/behaviors/index.js": "'use strict';\n\nallure.api.addTranslation('en', {\n    tab: {\n        behaviors: {\n            name: 'Behaviors'\n        }\n    },\n    widget: {\n        behaviors: {\n            name: 'Features by stories',\n            showAll: 'show all'\n        }\n    }\n});\n\nallure.api.addTranslation('ru', {\n    tab: {\n        behaviors: {\n            name: 'Функциональность'\n        }\n    },\n    widget: {\n        behaviors: {\n            name: 'Функциональность',\n            showAll: 'показать все'\n        }\n    }\n});\n\nallure.api.addTranslation('zh', {\n    tab: {\n        behaviors: {\n            name: '功能'\n        }\n    },\n    widget: {\n        behaviors: {\n            name: '特性场景',\n            showAll: '显示所有'\n        }\n    }\n});\n\nallure.api.addTranslation('de', {\n    tab: {\n        behaviors: {\n            name: 'Verhalten'\n        }\n    },\n    widget: {\n        behaviors: {\n            name: 'Features nach Stories',\n            showAll: 'Zeige alle'\n        }\n    }\n});\n\nallure.api.addTranslation('nl', {\n    tab: {\n        behaviors: {\n            name: 'Functionaliteit'\n        }\n    },\n    widget: {\n        behaviors: {\n            name: 'Features en story’s',\n            showAll: 'Toon alle'\n        }\n    }\n});\n\nallure.api.addTranslation('he', {\n    tab: {\n        behaviors: {\n            name: 'התנהגויות'\n        }\n    },\n    widget: {\n        behaviors: {\n            name: 'תכונות לפי סיפורי משתמש',\n            showAll: 'הצג הכול'\n        }\n    }\n});\n\nallure.api.addTranslation('br', {\n    tab: {\n        behaviors: {\n            name: 'Comportamentos'\n        }\n    },\n    widget: {\n        behaviors: {\n            name: 'Funcionalidades por história',\n            showAll: 'Mostrar tudo'\n        }\n    }\n});\n\nallure.api.addTranslation('ja', {\n    tab: {\n        behaviors: {\n            name: '振る舞い'\n        }\n    },\n    widget: {\n        behaviors: {\n            name: 'ストーリー別の機能',\n            showAll: '全て表示'\n        }\n    }\n});\n\nallure.api.addTranslation('es', {\n    tab: {\n        behaviors: {\n            name: 'Funcionalidades'\n        }\n    },\n    widget: {\n        behaviors: {\n            name: 'Funcionalidades por Historias de Usuario',\n            showAll: 'mostrar todo'\n        }\n    }\n});\n\nallure.api.addTranslation('kr', {\n    tab: {\n        behaviors: {\n            name: '동작'\n        }\n    },\n    widget: {\n        behaviors: {\n            name: '스토리별 기능',\n            showAll: '전체 보기'\n        }\n    }\n});\n\nallure.api.addTranslation('fr', {\n    tab: {\n        behaviors: {\n            name: 'Comportements'\n        }\n    },\n    widget: {\n        behaviors: {\n            name: 'Thèmes par histoires',\n            showAll: 'Montrer tout'\n        }\n    }\n});\n\nallure.api.addTranslation('pl', {\n    tab: {\n        behaviors: {\n            name: 'Zachowania'\n        }\n    },\n    widget: {\n        behaviors: {\n            name: 'Funkcje według historii',\n            showAll: 'pokaż wszystko'\n        }\n    }\n});\n\nallure.api.addTranslation('az', {\n    tab: {\n        behaviors: {\n            name: 'Davranışlar'\n        }\n    },\n    widget: {\n        behaviors: {\n            name: 'Hekayələr üzrə xüsusiyyətlər',\n            showAll: 'hamısını göstər'\n        }\n    }\n});\n\nallure.api.addTab('behaviors', {\n    title: 'tab.behaviors.name', icon: 'fa fa-list',\n    route: 'behaviors(/)(:testGroup)(/)(:testResult)(/)(:testResultTab)(/)',\n    onEnter: (function (testGroup, testResult, testResultTab) {\n        return new allure.components.TreeLayout({\n            testGroup: testGroup,\n            testResult: testResult,\n            testResultTab: testResultTab,\n            tabName: 'tab.behaviors.name',\n            baseUrl: 'behaviors',\n            url: 'data/behaviors.json',\n            csvUrl: 'data/behaviors.csv'\n        });\n    })\n});\n\nallure.api.addWidget('widgets', 'behaviors', allure.components.WidgetStatusView.extend({\n    rowTag: 'a',\n    title: 'widget.behaviors.name',\n    baseUrl: 'behaviors',\n    showLinks: true\n}));\n", 
 "plugin/packages/index.js": "'use strict';\n\nallure.api.addTranslation('en', {\n    tab: {\n        packages: {\n            name: 'Packages'\n        }\n    }\n});\n\nallure.api.addTranslation('ru', {\n    tab: {\n        packages: {\n            name: 'Пакеты'\n        }\n    }\n});\n\nallure.api.addTranslation('zh', {\n    tab: {\n        packages: {\n            name: '包'\n        }\n    }\n});\n\nallure.api.addTranslation('de', {\n    tab: {\n        packages: {\n            name: 'Pakete'\n        }\n    }\n});\n\nallure.api.addTranslation('nl', {\n    tab: {\n        packages: {\n            name: 'Packages'\n        }\n    }\n});\n\nallure.api.addTranslation('he', {\n    tab: {\n        packages: {\n            name: 'חבילות'\n        }\n    }\n});\n\nallure.api.addTranslation('br', {\n    tab: {\n        packages: {\n            name: 'Pacotes'\n        }\n    }\n});\n\nallure.api.addTranslation('ja', {\n    tab: {\n        packages: {\n            name: 'パッケージ'\n        }\n    }\n});\n\nallure.api.addTranslation('es', {\n    tab: {\n        packages: {\n            name: 'Paquetes'\n        }\n    }\n});\n\nallure.api.addTranslation('kr', {\n    tab: {\n        packages: {\n            name: '패키지'\n        }\n    }\n});\n\nallure.api.addTranslation('fr', {\n    tab: {\n        packages: {\n            name: 'Paquets'\n        }\n    }\n});\n\nallure.api.addTranslation('pl', {\n    tab: {\n        packages: {\n            name: 'Pakiety'\n        }\n    }\n});\n\nallure.api.addTranslation('az', {\n    tab: {\n        packages: {\n            name: 'Paketlər'\n        }\n    }\n});\n\nallure.api.addTab('packages', {\n    title: 'tab.packages.name', icon: 'fa fa-align-left',\n    route: 'packages(/)(:testGroup)(/)(:testResult)(/)(:testResultTab)(/)',\n    onEnter: (function (testGroup, testResult, testResultTab) {\n        return new allure.components.TreeLayout({\n            testGroup: testGroup,\n            testResult: testResult,\n            testResultTab: testResultTab,\n            tabName: 'tab.packages.name',\n            baseUrl: 'packages',\n            url: 'data/packages.json'\n        });\n    })\n});\n", 
 "plugin/screen-diff/index.js": "(function () {\n    var settings = allure.getPluginSettings('screen-diff', { diffType: 'diff' });\n\n    function renderImage(src) {\n        return (\n            '&lt;div class=\"screen-diff__container\"&gt;' +\n            '&lt;img class=\"screen-diff__image\" src=\"' +\n            src +\n            '\"&gt;' +\n            '&lt;/div&gt;'\n        );\n    }\n\n    function findImage(data, name) {\n        if (data.testStage && data.testStage.attachments) {\n            var matchedImage = data.testStage.attachments.filter(function (attachment) {\n                return attachment.name === name;\n            })[0];\n            if (matchedImage) {\n                return 'data/attachments/' + matchedImage.source;\n            }\n        }\n        return null;\n    }\n\n    function renderDiffContent(type, diffImage, actualImage, expectedImage) {\n        if (type === 'diff') {\n            if (diffImage) {\n                return renderImage(diffImage);\n            }\n        }\n        if (type === 'overlay' && expectedImage) {\n            return (\n                '&lt;div class=\"screen-diff__overlay screen-diff__container\"&gt;' +\n                '&lt;img class=\"screen-diff__image\" src=\"' +\n                expectedImage +\n                '\"&gt;' +\n                '&lt;div class=\"screen-diff__image-over\"&gt;' +\n                '&lt;img class=\"screen-diff__image\" src=\"' +\n                actualImage +\n                '\"&gt;' +\n                '&lt;/div&gt;' +\n                '&lt;/div&gt;'\n            );\n        }\n        if (actualImage) {\n            return renderImage(actualImage);\n        }\n        return 'No diff data provided';\n    }\n\n    var TestResultView = Backbone.Marionette.View.extend({\n        regions: {\n            subView: '.screen-diff-view',\n        },\n        template: function () {\n            return '&lt;div class=\"screen-diff-view\"&gt;&lt;/div&gt;';\n        },\n        onRender: function () {\n            var data = this.model.toJSON();\n            var testType = data.labels.filter(function (label) {\n                return label.name === 'testType';\n            })[0];\n            var diffImage = findImage(data, 'diff');\n            var actualImage = findImage(data, 'actual');\n            var expectedImage = findImage(data, 'expected');\n            if (!testType || testType.value !== 'screenshotDiff') {\n                return;\n            }\n            this.showChildView(\n                'subView',\n                new ScreenDiffView({\n                    diffImage: diffImage,\n                    actualImage: actualImage,\n                    expectedImage: expectedImage,\n                }),\n            );\n        },\n    });\n    var ErrorView = Backbone.Marionette.View.extend({\n        templateContext: function () {\n            return this.options;\n        },\n        template: function (data) {\n            return '&lt;pre class=\"screen-diff-error\"&gt;' + data.error + '&lt;/pre&gt;';\n        },\n    });\n    var AttachmentView = Backbone.Marionette.View.extend({\n        regions: {\n            subView: '.screen-diff-view',\n        },\n        template: function () {\n            return '&lt;div class=\"screen-diff-view\"&gt;&lt;/div&gt;';\n        },\n        onRender: function () {\n            jQuery\n                .getJSON(this.options.sourceUrl)\n                .then(this.renderScreenDiffView.bind(this), this.renderErrorView.bind(this));\n        },\n        renderErrorView: function (error) {\n            console.log(error);\n            this.showChildView(\n                'subView',\n                new ErrorView({\n                    error: error.statusText,\n                }),\n            );\n        },\n        renderScreenDiffView: function (data) {\n            this.showChildView(\n                'subView',\n                new ScreenDiffView({\n                    diffImage: data.diff,\n                    actualImage: data.actual,\n                    expectedImage: data.expected,\n                }),\n            );\n        },\n    });\n\n    var ScreenDiffView = Backbone.Marionette.View.extend({\n        className: 'pane__section',\n        events: function () {\n            return {\n                ['click [name=\"screen-diff-type-' + this.cid + '\"]']: 'onDiffTypeChange',\n                'mousemove .screen-diff__overlay': 'onOverlayMove',\n            };\n        },\n        initialize: function (options) {\n            this.diffImage = options.diffImage;\n            this.actualImage = options.actualImage;\n            this.expectedImage = options.expectedImage;\n            this.radioName = 'screen-diff-type-' + this.cid;\n        },\n        templateContext: function () {\n            return {\n                diffType: settings.get('diffType'),\n                diffImage: this.diffImage,\n                actualImage: this.actualImage,\n                expectedImage: this.expectedImage,\n                radioName: this.radioName,\n            };\n        },\n        template: function (data) {\n            if (!data.diffImage && !data.actualImage && !data.expectedImage) {\n                return '';\n            }\n\n            return (\n                '&lt;h3 class=\"pane__section-title\"&gt;Screen Diff&lt;/h3&gt;' +\n                '&lt;div class=\"screen-diff__content\"&gt;' +\n                '&lt;div class=\"screen-diff__switchers\"&gt;' +\n                '&lt;label&gt;&lt;input type=\"radio\" name=\"' +\n                data.radioName +\n                '\" value=\"diff\"&gt; Show diff&lt;/label&gt;' +\n                '&lt;label&gt;&lt;input type=\"radio\" name=\"' +\n                data.radioName +\n                '\" value=\"overlay\"&gt; Show overlay&lt;/label&gt;' +\n                '&lt;/div&gt;' +\n                renderDiffContent(\n                    data.diffType,\n                    data.diffImage,\n                    data.actualImage,\n                    data.expectedImage,\n                ) +\n                '&lt;/div&gt;'\n            );\n        },\n        adjustImageSize: function (event) {\n            var overImage = this.$(event.target);\n            overImage.width(overImage.width());\n        },\n        onRender: function () {\n            const diffType = settings.get('diffType');\n            this.$('[name=\"' + this.radioName + '\"][value=\"' + diffType + '\"]').prop(\n                'checked',\n                true,\n            );\n            if (diffType === 'overlay') {\n                this.$('.screen-diff__image-over img').on('load', this.adjustImageSize.bind(this));\n            }\n        },\n        onOverlayMove: function (event) {\n            var pageX = event.pageX;\n            var containerScroll = this.$('.screen-diff__container').scrollLeft();\n            var elementX = event.currentTarget.getBoundingClientRect().left;\n            var delta = pageX - elementX + containerScroll;\n            this.$('.screen-diff__image-over').width(delta);\n        },\n        onDiffTypeChange: function (event) {\n            settings.save('diffType', event.target.value);\n            this.render();\n        },\n    });\n    allure.api.addTestResultBlock(TestResultView, { position: 'before' });\n    allure.api.addAttachmentViewer('application/vnd.allure.image.diff', {\n        View: AttachmentView,\n        icon: 'fa fa-exchange',\n    });\n})();\n", 
 "plugin/screen-diff/styles.css": ".screen-diff__switchers {\n  margin-bottom: 1em;\n}\n\n.screen-diff__switchers label + label {\n  margin-left: 1em;\n}\n\n.screen-diff__overlay {\n  position: relative;\n  cursor: col-resize;\n}\n\n.screen-diff__container {\n  overflow-x: auto;\n}\n\n.screen-diff__image-over {\n  top: 0;\n  left: 0;\n  bottom: 0;\n  background: #fff;\n  position: absolute;\n  overflow: hidden;\n  box-shadow: 2px 0 1px -1px #aaa;\n}\n\n.screen-diff-error {\n  color: #fd5a3e;\n}\n", 
 "widgets/behaviors.json": "{\"total\":2,\"items\":[{\"uid\":\"f786dfba63b6cf0e6ebf3934d53dcd53\",\"name\":\"S3 Tests\",\"statistic\":{\"failed\":0,\"broken\":1,\"skipped\":0,\"passed\":0,\"unknown\":0,\"total\":1}}]}", 
 "widgets/categories-trend.json": "[{\"data\":{\"Product defects\":1,\"Test defects\":1}}]", 
 "widgets/categories.json": "{\"total\":2,\"items\":[{\"uid\":\"8fb3a91ba5aaf9de24cc8a92edc82b5d\",\"name\":\"Product defects\",\"statistic\":{\"failed\":1,\"broken\":0,\"skipped\":0,\"passed\":0,\"unknown\":0,\"total\":1}},{\"uid\":\"bdbf199525818fae7a8651db9eafe741\",\"name\":\"Test defects\",\"statistic\":{\"failed\":0,\"broken\":1,\"skipped\":0,\"passed\":0,\"unknown\":0,\"total\":1}}]}", 
 "widgets/duration-trend.json": "[{\"data\":{\"duration\":694}}]", 
 "widgets/duration.json": "[{\"uid\":\"41dbac6add42603\",\"name\":\"test_s3_file_present\",\"time\":{\"start\":1697550445150,\"stop\":1697550445489,\"duration\":339},\"status\":\"failed\",\"severity\":\"normal\"},{\"uid\":\"6de6652d2e2bbd6e\",\"name\":\"test_s3_file_present\",\"time\":{\"start\":1697550445844,\"stop\":1697550445844,\"duration\":0},\"status\":\"broken\",\"severity\":\"normal\"}]", 
 "widgets/environment.json": "[]", 
 "widgets/executors.json": "[]", 
 "widgets/history-trend.json": "[{\"data\":{\"failed\":1,\"broken\":1,\"skipped\":0,\"passed\":0,\"unknown\":0,\"total\":2}}]", 
 "widgets/launch.json": "[]", 
 "widgets/retry-trend.json": "[{\"data\":{\"run\":2,\"retry\":0}}]", 
 "widgets/severity.json": "[{\"uid\":\"41dbac6add42603\",\"name\":\"test_s3_file_present\",\"time\":{\"start\":1697550445150,\"stop\":1697550445489,\"duration\":339},\"status\":\"failed\",\"severity\":\"normal\"},{\"uid\":\"6de6652d2e2bbd6e\",\"name\":\"test_s3_file_present\",\"time\":{\"start\":1697550445844,\"stop\":1697550445844,\"duration\":0},\"status\":\"broken\",\"severity\":\"normal\"}]", 
 "widgets/status-chart.json": "[{\"uid\":\"41dbac6add42603\",\"name\":\"test_s3_file_present\",\"time\":{\"start\":1697550445150,\"stop\":1697550445489,\"duration\":339},\"status\":\"failed\",\"severity\":\"normal\"},{\"uid\":\"6de6652d2e2bbd6e\",\"name\":\"test_s3_file_present\",\"time\":{\"start\":1697550445844,\"stop\":1697550445844,\"duration\":0},\"status\":\"broken\",\"severity\":\"normal\"}]", 
 "widgets/suites.json": "{\"total\":2,\"items\":[{\"uid\":\"1391e8d00208145d2c262e76f0a53c75\",\"name\":\"pytest\",\"statistic\":{\"failed\":1,\"broken\":0,\"skipped\":0,\"passed\":0,\"unknown\":0,\"total\":1}},{\"uid\":\"149784927e2f940c18a420e9e053e5fb\",\"name\":\"allure_pytest_test\",\"statistic\":{\"failed\":0,\"broken\":1,\"skipped\":0,\"passed\":0,\"unknown\":0,\"total\":1}}]}", 
 "widgets/summary.json": "{\"reportName\":\"Allure Report\",\"testRuns\":[],\"statistic\":{\"failed\":1,\"broken\":1,\"skipped\":0,\"passed\":0,\"unknown\":0,\"total\":2},\"time\":{\"start\":1697550445150,\"stop\":1697550445844,\"duration\":694,\"minDuration\":0,\"maxDuration\":339,\"sumDuration\":339}}", 
};
    var server = sinon.fakeServer.create();

                server.respondWith("GET", "data/behaviors.csv", [
                      200, { "Content-Type": "text/csv" }, server_data["data/behaviors.csv"],
                ]);
            
                server.respondWith("GET", "data/behaviors.json", [
                      200, { "Content-Type": "application/json" }, server_data["data/behaviors.json"],
                ]);
            
                server.respondWith("GET", "data/categories.csv", [
                      200, { "Content-Type": "text/csv" }, server_data["data/categories.csv"],
                ]);
            
                server.respondWith("GET", "data/categories.json", [
                      200, { "Content-Type": "application/json" }, server_data["data/categories.json"],
                ]);
            
                server.respondWith("GET", "data/packages.json", [
                      200, { "Content-Type": "application/json" }, server_data["data/packages.json"],
                ]);
            
                server.respondWith("GET", "data/suites.csv", [
                      200, { "Content-Type": "text/csv" }, server_data["data/suites.csv"],
                ]);
            
                server.respondWith("GET", "data/suites.json", [
                      200, { "Content-Type": "application/json" }, server_data["data/suites.json"],
                ]);
            
                server.respondWith("GET", "data/timeline.json", [
                      200, { "Content-Type": "application/json" }, server_data["data/timeline.json"],
                ]);
            
                server.respondWith("GET", "data/test-cases/41dbac6add42603.json", [
                      200, { "Content-Type": "application/json" }, server_data["data/test-cases/41dbac6add42603.json"],
                ]);
            
                server.respondWith("GET", "data/test-cases/6de6652d2e2bbd6e.json", [
                      200, { "Content-Type": "application/json" }, server_data["data/test-cases/6de6652d2e2bbd6e.json"],
                ]);
            
                server.respondWith("GET", "export/influxDbData.txt", [
                      200, { "Content-Type": "text/plain;charset=UTF-8" }, server_data["export/influxDbData.txt"],
                ]);
            
                server.respondWith("GET", "export/mail.html", [
                      200, { "Content-Type": "text/html" }, server_data["export/mail.html"],
                ]);
            
                server.respondWith("GET", "export/prometheusData.txt", [
                      200, { "Content-Type": "text/plain;charset=UTF-8" }, server_data["export/prometheusData.txt"],
                ]);
            
                server.respondWith("GET", "history/categories-trend.json", [
                      200, { "Content-Type": "application/json" }, server_data["history/categories-trend.json"],
                ]);
            
                server.respondWith("GET", "history/duration-trend.json", [
                      200, { "Content-Type": "application/json" }, server_data["history/duration-trend.json"],
                ]);
            
                server.respondWith("GET", "history/history-trend.json", [
                      200, { "Content-Type": "application/json" }, server_data["history/history-trend.json"],
                ]);
            
                server.respondWith("GET", "history/history.json", [
                      200, { "Content-Type": "application/json" }, server_data["history/history.json"],
                ]);
            
                server.respondWith("GET", "history/retry-trend.json", [
                      200, { "Content-Type": "application/json" }, server_data["history/retry-trend.json"],
                ]);
            
                server.respondWith("GET", "plugin/behaviors/index.js", [
                      200, { "Content-Type": "application/javascript" }, server_data["plugin/behaviors/index.js"],
                ]);
            
                server.respondWith("GET", "plugin/packages/index.js", [
                      200, { "Content-Type": "application/javascript" }, server_data["plugin/packages/index.js"],
                ]);
            
                server.respondWith("GET", "plugin/screen-diff/index.js", [
                      200, { "Content-Type": "application/javascript" }, server_data["plugin/screen-diff/index.js"],
                ]);
            
                server.respondWith("GET", "plugin/screen-diff/styles.css", [
                      200, { "Content-Type": "text/css" }, server_data["plugin/screen-diff/styles.css"],
                ]);
            
                server.respondWith("GET", "widgets/behaviors.json", [
                      200, { "Content-Type": "application/json" }, server_data["widgets/behaviors.json"],
                ]);
            
                server.respondWith("GET", "widgets/categories-trend.json", [
                      200, { "Content-Type": "application/json" }, server_data["widgets/categories-trend.json"],
                ]);
            
                server.respondWith("GET", "widgets/categories.json", [
                      200, { "Content-Type": "application/json" }, server_data["widgets/categories.json"],
                ]);
            
                server.respondWith("GET", "widgets/duration-trend.json", [
                      200, { "Content-Type": "application/json" }, server_data["widgets/duration-trend.json"],
                ]);
            
                server.respondWith("GET", "widgets/duration.json", [
                      200, { "Content-Type": "application/json" }, server_data["widgets/duration.json"],
                ]);
            
                server.respondWith("GET", "widgets/environment.json", [
                      200, { "Content-Type": "application/json" }, server_data["widgets/environment.json"],
                ]);
            
                server.respondWith("GET", "widgets/executors.json", [
                      200, { "Content-Type": "application/json" }, server_data["widgets/executors.json"],
                ]);
            
                server.respondWith("GET", "widgets/history-trend.json", [
                      200, { "Content-Type": "application/json" }, server_data["widgets/history-trend.json"],
                ]);
            
                server.respondWith("GET", "widgets/launch.json", [
                      200, { "Content-Type": "application/json" }, server_data["widgets/launch.json"],
                ]);
            
                server.respondWith("GET", "widgets/retry-trend.json", [
                      200, { "Content-Type": "application/json" }, server_data["widgets/retry-trend.json"],
                ]);
            
                server.respondWith("GET", "widgets/severity.json", [
                      200, { "Content-Type": "application/json" }, server_data["widgets/severity.json"],
                ]);
            
                server.respondWith("GET", "widgets/status-chart.json", [
                      200, { "Content-Type": "application/json" }, server_data["widgets/status-chart.json"],
                ]);
            
                server.respondWith("GET", "widgets/suites.json", [
                      200, { "Content-Type": "application/json" }, server_data["widgets/suites.json"],
                ]);
            
                server.respondWith("GET", "widgets/summary.json", [
                      200, { "Content-Type": "application/json" }, server_data["widgets/summary.json"],
                ]);
            server.autoRespond = true;