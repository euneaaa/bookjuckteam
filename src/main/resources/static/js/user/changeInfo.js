{

    // form 태그
    const infoElem = document.querySelector("#info-frm");

    // if(form 태그) 안에서 발생하는 이벤트들
    if (infoElem) {
        const emailBtnElem = document.querySelector("#email_btn");
        const emailTextElem = document.querySelector("#email_text");
        const emailDivElem = document.querySelector("#email_div");
        let emailName = document.querySelector("#email_name");
        let emailNameTemp;

        let resendKey; //이메일 재전송을 위한

        // email 변경하기 버튼 클릭시 이벤트
        emailBtnElem.addEventListener("click", () => {
            changeText(); // Text 변환 이벤트 함수
        });

        // 변경하기 button 클릭시 Text 변환 => 이벤트 발생
        function changeText() {
            emailDivElem.innerHTML = null;
            emailDivElem.innerHTML = "<input type='text' name='currentEmail' class='text_box m-r-10' id='email_name'>    " +
                " <input type='button' value='인증하기' class='btn' id='email_btn2'>"
            const emailBtnElem2 = document.querySelector("#email_btn2");
            const emailName = document.querySelector("#email_name");
            emailBtnElem2.addEventListener("click", function checkMsg() {
                console.log(emailName.value);
                if (confirm("인증번호를 발송 하시겠습니까?")) {
                    makeInputText(emailName.value);
                    const param = {
                        currentEmail : emailName.value
                    }

                    myFetch.post(`/sendEmail`, data => {
                        console.log(data);
                        matchKey(data.result);
                        resend();
                    },param)
                }
            });
        }

        let keyElem;
        let btnElem;


        // 변경하기 button 클릭 => 인증하기 Text로 변경
        const makeInputText = (emailName) => {
            emailDivElem.innerHTML = null;
            emailDivElem.innerHTML =
                `<div class='flex-direc-column w-100'><input type='text' readonly id="putedMail" name='email' class='text_box m-b-5 back_color_grey4' value=${emailName} >` +
                `<div class='flex w-100 '><input type='text' id="keyElem" class='text_box m-r-10'> ` +
                `<input type='button' value='재전송' id="resendKey" class='btn m-r-5'> ` +
                `<input type='button' value='인증완료' class='btn btnElem' ></div></div>`;
            resendKey = document.querySelector('#resendKey');
            emailNameTemp = document.querySelector('#putedMail');

        };


        function matchKey(data){

            let suckey = document.querySelector('#sucKey'); //이메일 인증 실패,성공 알림 innertext
            btnElem = document.querySelector('.btnElem');
            btnElem.addEventListener('click', () => {

                keyElem = document.querySelector('#keyElem');
                console.log(btnElem)
                console.log(keyElem)

                if(Number(keyElem.value) === data){
                    let changeSubmit = document.querySelector('#change_info');
                    //이메일 인증에 성공하면 서브밋이 활성화가 되도록 하기위해 쓰는 변수.
                    const ps_box = document.querySelector("#addr1");
                    const ps_box2 = document.querySelector("#addr2");


                    console.log(ps_box)
                    console.log(ps_box2);
                    ps_box.readOnly=false;
                    ps_box2.readOnly=false;
                    ps_box.addEventListener('click', ()=>{
                        ps_box2.value = '';
                        ps_box.value = '';
                        new daum.Postcode({
                            oncomplete: function(data) {
                                // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분
                                console.log(data)
                                ps_box.value = data.address;
                                document.querySelector('#addr2').focus();
                            }
                        }).open();
                    })

                    suckey.innerHTML="이메일 인증 성공하였어요.";


                    //여기가 서브밋 변경부분
                    changeSubmit.type = 'submit';
                    changeSubmit.classList.remove("btn_back_color");
                    changeSubmit.classList.add("back_color_done");



                } else {
                    console.log(keyElem.value === data)
                    suckey.innerHTML="이메일 인증 실패하였어요. 다시 입력해주세요.";
                }
            })


        }




        function resend(){
            console.log('aa')
            resendKey.addEventListener('click', () => {
                console.log('sss')
                changeText();
                emailName = emailNameTemp.value;

            });
        }

        const ps_box = document.querySelector("#addr1");
        const ps_box2 = document.querySelector("#addr2");
        ps_box2.addEventListener('keyup', ()=>{
            const sumaddr = document.querySelector('#sumAddr');
            const sumedAddrVal = ps_box.value + ', ' + ps_box2.value;
            sumaddr.value = sumedAddrVal;
        })

    }

    const ps_box = document.querySelector("#addr1");
    const ps_box2 = document.querySelector("#addr2");

    let addr_btn = document.querySelector('#addr_btn');



    function chagneAddr(){
        ps_box.readOnly=false;
        ps_box2.readOnly=false;
        ps_box.addEventListener('click', ()=>{
            ps_box2.value = '';
            ps_box.value = '';
            new daum.Postcode({
                oncomplete: function(data) {
                    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분
                    console.log(data)
                    ps_box.value = data.address;
                    document.querySelector('#addr2').focus();
                }
            }).open();
        })
    }

    addr_btn.addEventListener('click', () =>{

        let changeSubmit = document.querySelector('#change_info');
        if(confirm("주소를 변경 하시겠습니까?")){
            chagneAddr();
            addr_btn.type = 'hidden';

            ps_box.addEventListener('click', ()=>{

                const ps_box = document.querySelector("#addr1");
                const ps_box2 = document.querySelector("#addr2");
                ps_box2.addEventListener('keyup', ()=>{
                    const sumaddr = document.querySelector('#sumAddr');
                    const sumedAddrVal = ps_box.value + ', ' + ps_box2.value;
                    sumaddr.value = sumedAddrVal;
                })
                changeSubmit.type = 'submit';
                changeSubmit.classList.remove("btn_back_color");
                changeSubmit.classList.add("back_color_done");
            })
        }

    })

}