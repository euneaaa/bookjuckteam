package com.project.bookjuck.cscenter;

import com.project.bookjuck.Const;
import com.project.bookjuck.cscenter.model.ComplaintEntity;
import com.project.bookjuck.cscenter.model.FaqEntity;
import com.project.bookjuck.cscenter.model.NoticeEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import static com.project.bookjuck.Const.ERR_5;

@Controller
@RequestMapping("/cscenter")
public class CsCenterController {
    @Autowired
    private CsCenterService service;


    //공지사항 리스트창
    @GetMapping("/notice")
    public String CsNotice() {
        return "cscenter/notice";
    }

    //공지사항 세부창
    @GetMapping("/notice/item")
    public String CsNoticeItem(Model model, NoticeEntity noticeEntity){
        model.addAttribute("item", service.selItemNotice(noticeEntity));
        return "cscenter/noticeitem";
    }

    //1대1문의창
    @GetMapping("/complaint")
    public String comPlaint(@ModelAttribute("complaintentity") ComplaintEntity complaintEntity) {
        return "cscenter/complaint";
    }

    //faq 리스트창
    @GetMapping("/faq")
    public String FaQ(){
        return "cscenter/faq";
    }


//    @PostMapping("/complaint")
//    public String comPlaintProc(ComplaintEntity complaintEntity, RedirectAttributes attr){
//        int result = service.inscomplaint(complaintEntity);
//        switch (result){
//            case 0 :
//                attr.addFlashAttribute(Const.MSG, ERR_5);
//                return "redirect:/cscenter/complaint";
//            default:
//                return "redirect:/cscenter";
//        }
//    }


    @PostMapping("/complaint")
    public String comPlaintProc(ComplaintEntity complaintEntity,RedirectAttributes attr, MultipartFile file) throws Exception{
        int result = service.inscomplaint(complaintEntity, file);
        switch (result){
            case 0 :
                attr.addFlashAttribute(Const.MSG, ERR_5);
                return "redirect:/cscenter/complaint";
            default:
                return "redirect:/main";
        }


    }
}
