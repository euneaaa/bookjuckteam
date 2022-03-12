{

    const joinFrmElem = document.querySelector('#join-frm');


    let idChkState = 2; //0: 아이디 사용 불가능, 1:아이디 사용가능, 2: 체크 안함

    const uidRegex = /^[a-z]+[a-z0-9]{5,20}$/i;
    const upwRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;
    const nmRegex = /^([가-힣]{2,10})$/;
    const birthRegex = /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/;
    const phRegex = /^01([0|1|6|7|8|9])?([0-9]{3,4})?([0-9]{4})$/;
    const emailRegex = /^.{1,20}$/;


    const setIdChkMsg = (data) => {
        idChkState = data.result; //0 or 1
        const idChkMsgElem = joinFrmElem.querySelector('#id-chk-msg');
        switch (data.result) {
            case 0:
                idChkMsgElem.innerText = '이미 사용중인 아이디 입니다.';
                break;
            case 1:
                idChkMsgElem.innerText = '사용할 수 있는 아이디 입니다.';
                break;
            case 3:
                idChkMsgElem.innerText = '조건에 맞지 않는 아이디입니다.';
                break;
        }
    };


    if(joinFrmElem) {

        joinFrmElem.addEventListener('submit', (e) => {
            const uid = joinFrmElem.uid.value;
            const upw = joinFrmElem.upw.value;
            const upwChk = joinFrmElem.querySelector('#upw-chk').value;
            const nm = joinFrmElem.nm.value;
            const ph = joinFrmElem.ph.value;
            const birth = joinFrmElem.birth.value;
            const email1 = joinFrmElem.email1.value;
            const email2 = joinFrmElem.email2.value;
            const addr2 = joinFrmElem.addr2.value;

            const join_msg_nm = joinFrmElem.querySelector('#join_msg_nm');
            const join_msg_birth = joinFrmElem.querySelector('#join_msg_birth');
            const join_msg_ph = joinFrmElem.querySelector('#join_msg_ph');
            const join_msg_uid = joinFrmElem.querySelector('#join_msg_uid');
            const join_msg_upw = joinFrmElem.querySelector('#join_msg_upw');
            const join_msg_addr = joinFrmElem.querySelector('#join_msg_addr');
            const join_msg_email = joinFrmElem.querySelector('#join_msg_email');

            if (!uidRegex.test(uid)) {
                // alert("아이디는 영소문자조합의 5-10자로 작성해주세요.");
                join_msg_uid.innerHTML="아이디는 영소문자조합의 6-10자로 작성해주세요.";
                e.preventDefault();
            } if (!upwRegex.test(upw)) {
                // alert("비밀번호는 영소문자 숫자 조합 8~15자리로 작성해주세요.");
                join_msg_upw.innerHTML="비밀번호는 영소문자 숫자 조합 8~15자리로 작성해주세요.";
                e.preventDefault();
            } if (upw !== upwChk) {
                // alert('비밀번호와 체크 비밀번호를 확인해 주세요.');
                join_msg_upw.innerHTML='비밀번호와 체크 비밀번호를 확인해 주세요.';
                e.preventDefault();
            }
            if (!nmRegex.test(nm)) {
                // alert("이름은 한글조합으로 2~5글자로 작성해주세요.");
                join_msg_nm.innerHTML="이름은 한글조합으로 2~5글자로 작성해주세요.";
                e.preventDefault();
            } if (!phRegex.test(ph)) {
                // alert("번호는 - 없이 입력해주세요.");
                join_msg_ph.innerHTML="번호는 - 없이 입력해주세요.";
                e.preventDefault();
            } if (!birthRegex.test(birth)) {
                // alert("생일은 - 없이 8자리 로 작성해주세요. ex)19990512");
                join_msg_birth.innerHTML="생일은 - 없이 8자리 로 작성해주세요. ex)19990512";
                e.preventDefault();
            } if (!emailRegex.test(email1)) {
                // alert("이메일 양식에 맞추어 입력하세요.");
                join_msg_email.innerHTML = "이메일 양식에 맞추어 입력하세요.";
                e.preventDefault();
            }  if (idChkState !== 1) {
                switch (idChkState) {
                    case 0:
                        alert('다른 아이디를 사용해 주세요!');
                        break;
                    case 2:
                        alert('아이디 중복 체크를 해주세요!');
                        break;
                }
                e.preventDefault();
            }if(email2 === "" || email2 === null){
                // alert("이메일 주소를 선택해주세요.");
                join_msg_email.innerHTML = "이메일 주소를 선택해주세요.";
                e.preventDefault();
            }
             if(addr2 === "" || addr2 === null){
                // alert("상세주소를 입력하세요.");
                join_msg_addr.innerHTML="상세주소를 입력하세요.";
                e.preventDefault();
            }
        });

        joinFrmElem.uid.addEventListener('keyup', () => {
            const idChkMsgElem = joinFrmElem.querySelector('#id-chk-msg');
            const join_msg_uid = joinFrmElem.querySelector('#join_msg_uid');
            idChkMsgElem.innerText = '';
            join_msg_uid.innerHTML = '';
            idChkState = 2;

        });

        joinFrmElem.upw.addEventListener('keyup',() => {
            const join_msg_upw = joinFrmElem.querySelector('#join_msg_upw');
            join_msg_upw.innerText = '';
        });

       
        document.querySelector('#upw-chk').addEventListener('keyup',() => {
            const join_msg_upw = joinFrmElem.querySelector('#join_msg_upw');
            join_msg_upw.innerText = '';
        });


        joinFrmElem.nm.addEventListener('keyup',() => {
            const join_msg_nm = joinFrmElem.querySelector('#join_msg_nm');
            join_msg_nm.innerText = '';
        });

        joinFrmElem.ph.addEventListener('keyup',() => {
            const join_msg_ph = joinFrmElem.querySelector('#join_msg_ph');
            join_msg_ph.innerText = '';
        });

        joinFrmElem.birth.addEventListener('keyup',() => {
            const join_msg_birth = joinFrmElem.querySelector('#join_msg_birth');
            join_msg_birth.innerText = '';
        });

        joinFrmElem.addr2.addEventListener('keyup',() => {
            const join_msg_addr = joinFrmElem.querySelector('#join_msg_addr');
            join_msg_addr.innerText = '';
        });

        joinFrmElem.email1.addEventListener('keyup',() => {
            const join_msg_email = joinFrmElem.querySelector('#join_msg_email');
            join_msg_email.innerText = '';
        });

        joinFrmElem.email2.addEventListener('keyup',() => {
            const join_msg_email = joinFrmElem.querySelector('#join_msg_email');
            join_msg_email.innerText = '';
        });


        //아이디 중복 체크 버튼
        const idBtnChkElem = joinFrmElem.querySelector('#id-btn-chk');
        idBtnChkElem.addEventListener('click', () => {
            const idVal = joinFrmElem.uid.value;
            fetch(`/user/idChk/${idVal}`)
                .then(res => res.json())
                .then((data) => {
                    setIdChkMsg(data);
                }).catch((e) => {
                console.log(e);
            });
        });

    }

    const email2Elem = document.querySelector('#email2');
    const emailsecElem = document.querySelector('#emailsecform')
    console.log(email2Elem)


    emailsecElem.addEventListener('change', () =>{
        if(emailsecElem.options[emailsecElem.selectedIndex]){
            console.log(emailsecElem.options[emailsecElem.selectedIndex])

            email2Elem.value = emailsecElem.options[emailsecElem.selectedIndex].value;
        }

    })


    const ps_box = joinFrmElem.querySelector("#addr1");

    ps_box.addEventListener('click', ()=>{
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