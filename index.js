import { createClient } from "@supabase/supabase-js";
const supabase = createClient("https://yqeyhicubfxkflrnhlrt.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlxZXloaWN1YmZ4a2Zscm5obHJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc1NTE0NTksImV4cCI6MjAxMzEyNzQ1OX0.WcKiNUkPmeSl8Zf48oB2lU0Fl16X_4FZO5rujN_-W_0");

// Функция для увеличения счетчика на 1 у всех пользователей
async function increaseCountForAllUsers() {
    //console.log("START func")
    let users = await supabase
        .from('users')
        .select()
        .lt("energy", 1000)

    users.data.forEach(async user => {
        // Увеличиваем значение count на 1
        //console.log(user?.energy > 999)
        //if(user?.enegy > 999) {
            //console.log(user.nickname)
            const {data, error} = await supabase
            .from('users')
            .update({ energy: user.energy + (user.recovlvl > 0 ? (user.recovlvl+1 > 1000 ? user.recovlvl+1 : (1000 - user.energy)) : 1) })
            .eq('id', user.id);
            //console.log(error)
        //}
    });
}

// Вызываем функцию increaseCountForAllUsers каждую секунду
setInterval(increaseCountForAllUsers, 1000);